<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class HybridSearchService
{
    public function __construct(
        protected VectorStoreService $vectorService,
        protected EmbeddingService $embeddingService
    ) {}

    public function search(
        string $query,
        array $filters = [],
        float $semanticWeight = 0.6,
        int $limit = 20
    ): Collection {
        // 1. Text-based search (PostgreSQL)
        $textResults = $this->textSearch($query, $filters, $limit);

        // 2. Semantic search (Qdrant)
        $semanticResults = $this->semanticSearch($query, $filters, $limit);

        // 3. Gabungkan hasil
        return $this->combineResults($textResults, $semanticResults, $semanticWeight);
    }

    protected function textSearch(string $query, array $filters, int $limit): Collection
    {
        return Book::query()
            ->when($query, fn ($q) => $q->whereFullText(['title', 'author', 'description'], $query))
            ->when(Arr::get($filters, 'categories'), fn ($q, $cats) =>
                $q->whereJsonContains('categories', $cats))
            ->when(Arr::get($filters, 'year_min'), fn ($q, $year) =>
                $q->where('publication_year', '>=', $year))
            ->when(Arr::get($filters, 'year_max'), fn ($q, $year) =>
                $q->where('publication_year', '<=', $year))
            ->limit($limit)
            ->get()
            ->map(fn ($book) => [
                'score' => $this->calculateTextScore($book, $query), // Skor dinamis
                'book' => $book,
                'type' => 'text'
            ]);
    }

    protected function calculateTextScore(Book $book, string $query): float
    {
        // Implementasi scoring yang lebih canggih di PostgreSQL
        // Contoh sederhana: hitung kemunculan kata kunci
        $keywords = explode(' ', strtolower($query));
        $text = strtolower($book->title.' '.$book->author.' '.$book->description);

        $score = 0;
        foreach ($keywords as $keyword) {
            $score += substr_count($text, $keyword);
        }

        return min(1.0, $score * 0.1); // Normalisasi ke range 0-1
    }

    protected function semanticSearch(string $query, array $filters, int $limit): Collection
    {
        $embedding = $this->embeddingService->generateFromText($query);

        $vectorResults = $this->vectorService->searchVectors(
            embedding: $embedding,
            limit: $limit,
            filters: $this->adaptFilters($filters)
        );

        return collect($vectorResults)
            ->map(function ($item) {
                return [
                    'score' => $item['score'],
                    'book' => Book::find($item['id']),
                    'type' => 'semantic'
                ];
            })
            ->filter();
    }

    protected function adaptFilters(array $filters): array
    {
        return [
            'categories' => Arr::get($filters, 'categories'),
            'publication_year' => [
                'gte' => Arr::get($filters, 'year_min'),
                'lte' => Arr::get($filters, 'year_max')
            ]
        ];
    }

    protected function combineResults(
        Collection $textResults,
        Collection $semanticResults,
        float $semanticWeight
    ): Collection {
        // Gabungkan semua hasil
        $allResults = $textResults->merge($semanticResults);

        // Kelompokkan berdasarkan book ID
        return $allResults
            ->groupBy(fn ($item) => $item['book']->id)
            ->map(function ($group) use ($semanticWeight) {
                $textScore = $group->where('type', 'text')->first()['score'] ?? 0;
                $semanticScore = $group->where('type', 'semantic')->first()['score'] ?? 0;

                return [
                    'book' => $group->first()['book'],
                    'hybrid_score' => ($textScore * (1 - $semanticWeight)) +
                                    ($semanticScore * $semanticWeight),
                    'components' => [
                        'text_score' => $textScore,
                        'semantic_score' => $semanticScore
                    ]
                ];
            })
            ->sortByDesc('hybrid_score')
            ->values();
    }
}
