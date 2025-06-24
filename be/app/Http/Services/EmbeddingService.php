<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class EmbeddingService
{
    protected string $endpoint;

    public function __construct()
    {
        $this->endpoint = config('services.jinaai.endpoint', 'https://api.jina.ai/v1/embeddings');
    }

    public function generateFromText(string $text): array
    {
        return $this->batchEmbed([$text])[0]['embedding'];
    }

    public function generateFromBook(string $title, string $description, array $categories): array
    {
        $combinedText = sprintf(
            "Title: %s. Description: %s. Categories: %s.",
            $title,
            $description,
            implode(', ', $categories)
        );

        return $this->generateFromText($combinedText);
    }

    public function batchEmbed(array $texts): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.jinaai.api_key'),
            'Content-Type' => 'application/json',
        ])->timeout(120)
          ->post($this->endpoint, [
              'input' => $texts,
              'model' => 'jina-embeddings-v2'
          ]);

        return $response->throw()->json()['data'];
    }
}
