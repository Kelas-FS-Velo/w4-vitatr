<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Models\Book;
use Illuminate\Support\Str;
use App\Services\EmbeddingService;
use App\Services\VectorStoreService;
use App\Services\HybridSearchService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    public function __construct(
        protected EmbeddingService $embeddingService,
        protected VectorStoreService $vectorStoreService,
        protected HybridSearchService $hybridSearchService
    ) {}

    public function index()
    {
        return Book::query()
            ->select([
                'id',
                'title',
                'author',
                'isbn',
                'publication_year',
                'cover_image',
                'stock_available',
                'categories'
            ])
            ->get();
    }

    public function store(StoreBookRequest $request)
    {
        $validated = $request->validated();

        try {
            // Handle cover image upload
            $coverPath = $request->file('cover_image')->store('covers', 'public');
            $coverUrl = Storage::url($coverPath);

            // Generate UUID
            $bookId = (string) Str::uuid();

            // Create book first (transaction ensures rollback if vector ops fail)
            $book = DB::transaction(function () use ($validated, $bookId, $coverUrl) {
                $book = Book::create([
                    'id' => $bookId,
                    'title' => $validated['title'],
                    'author' => $validated['author'],
                    'isbn' => $validated['isbn'],
                    'description' => $validated['description'],
                    'publication_year' => $validated['publication_year'],
                    'cover_image' => $coverUrl,
                    'stock_available' => $validated['stock_available'],
                    'categories' => $validated['categories']
                ]);

                // Generate and store embedding
                $embedding = $this->embeddingService->generateFromText($validated['description']);
                $vectorId = $this->vectorStoreService->upsertVector(
                    $bookId,
                    $embedding,
                    $this->createVectorPayload($book)
                );

                // Update book with vector ID
                $book->update(['vector_id' => $vectorId]);

                return $book;
            });

            return response()->json([
                'message' => 'Book created successfully',
                'book' => $book
            ], 201);

        } catch (\Exception $e) {
            Log::error('Book creation failed: '.$e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->except('cover_image')
            ]);

            // Clean up uploaded file if creation failed
            if (isset($coverPath) && Storage::disk('public')->exists($coverPath)) {
                Storage::disk('public')->delete($coverPath);
            }

            return response()->json([
                'message' => 'Failed to create book',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function show(Book $book)
    {
        return $book->makeVisible(['description', 'vector_id']);
    }

    public function update(StoreBookRequest $request, Book $book)
    {
        $validated = $request->validated();

        try {
            return DB::transaction(function () use ($request, $validated, $book) {
                // Handle cover image update
                if ($request->hasFile('cover_image')) {
                    // Delete old cover if exists
                    if ($book->cover_image) {
                        $oldPath = str_replace('/storage/', '', $book->cover_image);
                        Storage::disk('public')->delete($oldPath);
                    }

                    $coverPath = $request->file('cover_image')->store('covers', 'public');
                    $validated['cover_image'] = Storage::url($coverPath);
                }

                // Check if description changed (requires embedding update)
                $needsVectorUpdate = $book->description !== $validated['description'];
                $originalVectorId = $book->vector_id;

                $book->update($validated);

                // Update vector if needed
                if ($needsVectorUpdate) {
                    $embedding = $this->embeddingService->generateFromText($validated['description']);
                    $vectorId = $this->vectorStoreService->upsertVector(
                        $book->id,
                        $embedding,
                        $this->createVectorPayload($book)
                    );

                    // Only update if vector ID changed
                    if ($vectorId !== $originalVectorId) {
                        $book->update(['vector_id' => $vectorId]);
                    }
                }

                return response()->json([
                    'message' => 'Book updated successfully',
                    'book' => $book
                ]);
            });

        } catch (\Exception $e) {
            Log::error('Book update failed: '.$e->getMessage(), [
                'book_id' => $book->id,
                'exception' => $e
            ]);

            return response()->json([
                'message' => 'Failed to update book',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function destroy(Book $book)
    {
        try {
            DB::transaction(function () use ($book) {
                // Delete vector first
                if ($book->vector_id) {
                    $this->vectorStoreService->deleteVector($book->vector_id);
                }

                // Delete cover image if exists
                if ($book->cover_image) {
                    $path = str_replace('/storage/', '', $book->cover_image);
                    Storage::disk('public')->delete($path);
                }

                // Delete book
                $book->delete();
            });

            return response()->noContent();

        } catch (\Exception $e) {
            Log::error('Book deletion failed: '.$e->getMessage(), [
                'book_id' => $book->id,
                'exception' => $e
            ]);

            return response()->json([
                'message' => 'Failed to delete book',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Create payload for vector storage
     */
    protected function createVectorPayload(Book $book): array
    {
        return [
            'title' => $book->title,
            'author' => $book->author,
            'year' => $book->publication_year,
            'categories' => $book->categories,
            'isbn' => $book->isbn,
            'type' => 'book'
        ];
    }
}
