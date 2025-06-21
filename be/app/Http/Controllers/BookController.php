<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Services\EmbeddingService;
use App\Services\VectorStoreService;

class BookController extends Controller
{
    public function index()
    {
        return Book::all();
    }

    public function store(StoreBookRequest $request)
    {
        $validated = $request->validated();

        // Simpan cover image
        $coverPath = $request->file('cover_img')->store('covers', 'public');
        $coverUrl = '/storage/' . $coverPath;

        // UUID
        $bookId = (string) Str::uuid();

        // Generate embedding dari Jina AI
        $embedding = app(EmbeddingService::class)->generateFromText($validated['description']);

        // Simpan embedding ke Qdrant
        $vectorId = app(VectorStoreService::class)->upsertVector($bookId, $embedding);

        // Simpan ke database
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
            'categories' => json_encode($validated['categories']),
        ]);

        return response()->json([
            'message' => 'Book created successfully',
            'book' => $book,
        ], 201);
    }

    public function show(Book $book)
    {
        return $book;
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'publication_year' => 'required|integer|min:1000|max:' . date('Y'),
            'isbn' => 'required|string|unique:books,isbn,' . $book->id,
            'description' => 'required|string',
            'categories' => 'required|array|min:1',
            'categories.*' => 'string',
            'stock_available' => 'required|integer|min:0',
            'cover_img' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('cover_img')) {
            $coverPath = $request->file('cover_img')->store('covers', 'public');
            $validated['cover_image'] = '/storage/' . $coverPath;
        }

        $book->update([
            'title' => $validated['title'],
            'author' => $validated['author'],
            'isbn' => $validated['isbn'],
            'description' => $validated['description'],
            'publication_year' => $validated['publication_year'],
            'cover_image' => $validated['cover_image'] ?? $book->cover_image,
            'categories' => json_encode($validated['categories']),
            'stock_available' => $validated['stock_available'],
        ]);

        return response()->json($book);
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return response()->noContent();
    }
}
