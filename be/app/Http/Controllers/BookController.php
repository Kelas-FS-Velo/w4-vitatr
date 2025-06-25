<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Models\Book;
use Illuminate\Support\Str;
use App\Services\EmbeddingService;
use App\Services\VectorStoreService;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    public function index()
    {
        return Book::all();
    }

    public function store(StoreBookRequest $request)
    {
        // Data sudah divalidasi oleh StoreBookRequest
        $validated = $request->validated();

        try {
        // Handle cover image upload
        $coverPath = $request->file('cover_img')->store('covers', 'public');
        $coverUrl = '/storage/' . $coverPath;

        // Generate UUID
        $bookId = (string) Str::uuid();

        // Generate embedding
        $embedding = app(EmbeddingService::class)->generateFromText($validated['description']);
        $vectorId = app(VectorStoreService::class)->upsertVector($bookId, $embedding);

        // Create book
        $book = Book::create([
            'id' => $bookId,
            'title' => $validated['title'],
            'author' => $validated['author'],
            'isbn' => $validated['isbn'],
            'description' => $validated['description'],
            'publication_year' => $validated['publication_year'],
            'cover_image' => $coverUrl,
            'stock_available' => $validated['stock_available'],
            'vector_id' => $vectorId,
            'categories' => $validated['categories'] // Asumsi sudah berupa array
        ]);

        return response()->json([
            'message' => 'Book created successfully',
            'book' => $book
        ], 201);
        } catch (\Exception $e) {
            Log::error('Book creation failed: '.$e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all()
            ]);
            return response()->json([
                'message' => 'Failed to create book',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function show(Book $book)
    {
        return $book;
    }

    public function update(StoreBookRequest $request, Book $book)
    {
        $validated = $request->validated();

        // Handle cover image update jika ada
        if ($request->hasFile('cover_img')) {
            $coverPath = $request->file('cover_img')->store('covers', 'public');
            $validated['cover_image'] = '/storage/' . $coverPath;
        }

        // Update embedding jika deskripsi berubah
        if ($book->description !== $validated['description']) {
            $embedding = app(EmbeddingService::class)->generateFromText($validated['description']);
            $vectorId = app(VectorStoreService::class)->upsertVector($book->id, $embedding);
            $validated['vector_id'] = $vectorId;
        }

        $book->update($validated);

        return response()->json($book);
    }
    
    public function destroy(Book $book)
    {
        // Hapus vector dari Qdrant
        app(VectorStoreService::class)->deleteVector($book->vector_id);

        $book->delete();

        return response()->noContent();
    }
}
