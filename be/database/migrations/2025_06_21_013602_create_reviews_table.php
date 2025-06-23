<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('reviews', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->uuid('book_id');
        $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
        $table->tinyInteger('rating');
        $table->text('comment')->nullable();
        $table->timestamps();
    });

    // Tambahkan constraint rating harus 1-5 (untuk PostgreSQL)
    DB::statement('ALTER TABLE reviews ADD CONSTRAINT rating_check CHECK (rating >= 1 AND rating <= 5)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
