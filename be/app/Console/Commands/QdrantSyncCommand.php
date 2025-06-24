<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Book;
use App\Services\EmbeddingService;
use App\Services\VectorStoreService;
use Illuminate\Support\Facades\Log;

class QdrantSyncCommand extends Command
{
    protected $signature = 'qdrant:sync
                          {--chunk=100 : Number of records per batch}
                          {--from-id=0 : Starting ID}';

    protected $description = 'Sync all books to Qdrant with embeddings';

    public function handle(EmbeddingService $embedder, VectorStoreService $qdrant)
    {
        $total = Book::where('id', '>', $this->option('from-id'))->count();
        $processed = 0;
        $bar = $this->output->createProgressBar($total);

        Book::where('id', '>', $this->option('from-id'))
            ->chunkById($this->option('chunk'), function ($books) use ($embedder, $qdrant, $bar, &$processed) {
                $points = [];
                $texts = [];

                // Prepare batch
                foreach ($books as $book) {
                    $texts[] = sprintf(
                        "Title: %s. Description: %s. Categories: %s.",
                        $book->title,
                        $book->description,
                        implode(', ', $book->categories)
                    );
                }

                // Batch generate embeddings
                try {
                    $embeddings = $embedder->batchEmbed($texts);

                    foreach ($books as $index => $book) {
                        $points[] = [
                            'id' => $book->id,
                            'vector' => $embeddings[$index]['embedding'],
                            'payload' => [
                                'title' => $book->title,
                                'author' => $book->author,
                                'categories' => $book->categories,
                                'publication_year' => $book->publication_year,
                                'cover_url' => $book->cover_image
                            ]
                        ];
                        $processed++;
                    }

                    $qdrant->batchUpsert($points);
                    $bar->advance(count($books));

                } catch (\Exception $e) {
                    Log::error("Batch processing failed", ['error' => $e->getMessage()]);
                }
            });

        $bar->finish();
        $this->newLine();
        $this->info("Successfully processed {$processed}/{$total} books");
    }
}
