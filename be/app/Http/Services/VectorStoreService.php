<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class VectorStoreService
{
    protected string $endpoint;
    protected string $collection;

    public function __construct()
    {
        $this->endpoint = rtrim(config('services.qdrant.endpoint'), '/');
        $this->collection = config('services.qdrant.collection', 'books');
    }

    public function upsertVector(string $id, array $vector): string
    {
        $payload = [
            'points' => [[
                'id' => $id,
                'vector' => $vector,
                'payload' => ['type' => 'book'],
            ]],
        ];

        $response = Http::post("{$this->endpoint}/collections/{$this->collection}/points", $payload);

        if (!$response->successful()) {
            throw new \Exception('Failed to upsert vector into Qdrant');
        }

        return $id;
    }

    public function searchVectors(
        array $embedding,
        int $limit = 10,
        float $scoreThreshold = 0.3,
        array $filters = []
    ): array {
        $payload = [
            'vector' => $embedding,
            'limit' => $limit,
            'with_payload' => true,
            'score_threshold' => $scoreThreshold,
        ];

        // Tambahkan filter jika ada
        if (!empty($filters)) {
            $payload['filter'] = $this->buildFilterQuery($filters);
        }

        $response = Http::withHeaders([
            'api-key' => config('services.qdrant.api_key')
        ])->post(
            "{$this->endpoint}/collections/{$this->collection}/points/search",
            $payload
        );

        return $response->throw()->json()['result'];
    }

    protected function buildFilterQuery(array $filters): array
    {
        $must = [];

        if (isset($filters['categories'])) {
            $must[] = [
                'key' => 'categories',
                'match' => ['values' => $filters['categories']]
            ];
        }

        if (isset($filters['publication_year'])) {
            $must[] = [
                'key' => 'publication_year',
                'range' => ['gte' => $filters['publication_year']]
            ];
        }

        return ['must' => $must];
    }

    public function batchUpsert(array $points): void
    {
        $maxRetries = 3;
        $retryDelay = 1000; // ms

        $payload = ['points' => $points];

        retry($maxRetries, function () use ($payload) {
            $response = Http::withHeaders([
                'api-key' => config('services.qdrant.api_key'),
                'Content-Type' => 'application/json'
            ])->timeout(60)
            ->post(
                "{$this->endpoint}/collections/{$this->collection}/points",
                    $payload
            );

            if (!$response->successful()) {
                throw new \Exception("Qdrant error: " . $response->body());
            }
        }, $retryDelay);
    }

    public function deleteVector(string $vectorId): bool
    {
        try {
            $response = Http::delete("{$this->endpoint}/collections/{$this->collection}/points", [
                'points' => [$vectorId]
            ]);

            if (!$response->successful()) {
                Log::error('Qdrant delete failed', [
                    'status' => $response->status(),
                    'response' => $response->body()
                ]);
                return false;
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Qdrant delete error: ' . $e->getMessage());
            return false;
        }
    }
}
