<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

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

        return $id; // Qdrant pakai ID yang sama
    }
}
