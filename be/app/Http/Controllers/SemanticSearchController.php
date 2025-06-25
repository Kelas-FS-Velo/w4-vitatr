<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Services\EmbeddingService;
use App\Services\VectorStoreService;

class SemanticSearchController extends Controller
{
    public function __construct(
        protected EmbeddingService $embeddingService,
        protected VectorStoreService $vectorStoreService
    ) {}

    /**
     * Handle semantic book search
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function search(Request $request)
    {
        // 1. Validasi input
        $validated = $request->validate([
            'query' => 'required|string|min:3|max:255',
            'limit' => 'sometimes|integer|min:1|max:20',
            'threshold' => 'sometimes|numeric|min:0|max:1',
            'filters' => 'sometimes|array',
            'filters.categories' => 'sometimes|array',
            'filters.publication_year' => 'sometimes|integer|min:1900|max:' . date('Y'),
        ]);


        try {
            // 2. Konversi query ke embedding
            $embedding = $this->embeddingService->generateFromText($validated['query']);

            // 3. Search di Qdrant
            $results = $this->vectorStoreService->searchVectors(
                embedding: $embedding,
                limit: $validated['limit'] ?? 10,
                scoreThreshold: $validated['threshold'] ?? 0.3,
                filters: $validated['filters'] ?? []
            );

            // 4. Format response
            return response()->json([
                'query' => $validated['query'],
                'results' => $results,
                'vector_dimensions' => count($embedding)
            ]);

        } catch (\Exception $e) {
            Log::error('Semantic search failed', [
                'query' => $validated['query'],
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Search service unavailable',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 503);
        }
    }
}
