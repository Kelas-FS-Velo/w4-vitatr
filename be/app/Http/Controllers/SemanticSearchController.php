<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Book;
use App\Services\HybridSearchService;
use App\Services\EmbeddingService;
use App\Services\VectorStoreService;
use Illuminate\Support\Collection;

class SemanticSearchController extends Controller
{
    public function __construct(
        protected HybridSearchService $hybridSearchService,
        protected EmbeddingService $embeddingService,
        protected VectorStoreService $vectorStoreService
    ) {}

    /**
     * Handle hybrid book search
     */
    public function search(Request $request)
    {
        $validated = $request->validate([
            'query' => 'required|string|min:3|max:255',
            'limit' => 'sometimes|integer|min:1|max:50',
            'threshold' => 'sometimes|numeric|min:0|max:1',
            'semantic_weight' => 'sometimes|numeric|min:0|max:1',
            'filters' => 'sometimes|array',
            'filters.categories' => 'sometimes|array',
            'filters.year_min' => 'sometimes|integer|min:1900',
            'filters.year_max' => 'sometimes|integer|min:1900|max:' . date('Y'),
            'search_mode' => 'sometimes|string|in:hybrid,text,semantic'
        ]);

        try {
            $searchMode = $validated['search_mode'] ?? 'hybrid';

            // Use the hybrid service's main search method for all modes
            $results = $this->hybridSearchService->search(
                query: $validated['query'],
                filters: $validated['filters'] ?? [],
                semanticWeight: $searchMode === 'semantic' ? 1.0 : ($searchMode === 'text' ? 0.0 : ($validated['semantic_weight'] ?? 0.6)),
                limit: $validated['limit'] ?? 20
            );

            return response()->json([
                'query' => $validated['query'],
                'search_mode' => $searchMode,
                'semantic_weight' => $searchMode === 'semantic' ? 1.0 : ($searchMode === 'text' ? 0.0 : ($validated['semantic_weight'] ?? 0.6)),
                'results' => $this->formatResults($results),
                'count' => $results->count()
            ]);

        } catch (\Exception $e) {
            Log::error('Search failed', [
                'error' => $e->getMessage(),
                'trace' => config('app.debug') ? $e->getTraceAsString() : null
            ]);

            return response()->json([
                'message' => 'Search service unavailable',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 503);
        }
    }

    /**
     * Format results for consistent API response
     */
    protected function formatResults(Collection $results): array
    {
        return $results->map(function ($item) {
            return [
                'id' => $item['book']->id,
                'title' => $item['book']->title,
                'author' => $item['book']->author,
                'year' => $item['book']->publication_year,
                'categories' => $item['book']->categories,
                'score' => $item['hybrid_score'] ?? $item['score'],
                'score_components' => $item['components'] ?? [
                    'text_score' => $item['type'] === 'text' ? $item['score'] : null,
                    'semantic_score' => $item['type'] === 'semantic' ? $item['score'] : null
                ],
                'search_type' => $item['type'] ?? 'hybrid'
            ];
        })->toArray();
    }
}
