<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id(); // Tetap bigint autoincrement
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Asumsinya user masih pakai bigint
            $table->uuid('book_id'); // Sesuaikan tipe dengan books.id (uuid)
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
            $table->date('borrowed_at');
            $table->date('due_at');
            $table->date('returned_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
