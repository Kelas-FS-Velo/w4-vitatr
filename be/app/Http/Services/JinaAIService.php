<?php

namespace App\Http\Services;

use GuzzleHttp\Client;

class JinaAIService
{
    private Client $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.jina.ai/v1/',
            'timeout' => 15.0,
        ]);
    }

    public function generate(string $prompt): array
    {
        $response = $this->client->post('generate', [
            'headers' => [
                'Authorization' => 'Bearer '.config('services.jinaai.key'),
                'Accept' => 'application/json',
            ],
            'json' => [
                'prompt' => $prompt,
                // parameter lainnya
            ]
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
