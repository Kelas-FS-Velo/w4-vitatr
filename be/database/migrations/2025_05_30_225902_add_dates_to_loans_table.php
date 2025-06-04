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
    Schema::table('loans', function (Blueprint $table) {
        $table->date('borrowed_at')->after('book_id');
        $table->date('due_at')->after('borrowed_at');
        $table->date('returned_at')->nullable()->after('due_at');
    });
}

public function down(): void
{
    Schema::table('loans', function (Blueprint $table) {
        $table->dropColumn(['borrowed_at', 'due_at', 'returned_at']);
    });
}

};
