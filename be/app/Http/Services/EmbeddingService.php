<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class EmbeddingService
{
    protected string $endpoint;

    public function __construct()
    {
        // Jina Embedding API endpoint (ganti sesuai endpoint Jina)
        $this->endpoint = config('services.jinaai.endpoint', 'https://api.jina.ai/v1/embeddings');
    }

    public function generateFromText(string $text): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.jinaai.api_key'),
            'Content-Type' => 'application/json',
        ])->post($this->endpoint, [
            'input' => [$text],
            'model' => 'jina-embeddings-v2-base-en',
        ]);

        if (!$response->successful()) {
            throw new \Exception('Failed to get embedding from JinaAI');
        }

        return $response->json('data.0.embedding'); // Ambil array float
    }
}
