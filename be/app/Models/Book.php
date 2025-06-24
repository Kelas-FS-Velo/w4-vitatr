<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'id', // Jika menggunakan UUID
        'title',
        'author',
        'isbn',
        'description',
        'publication_year',
        'cover_image', // Sesuaikan dengan nama di controller
        'stock_available',
        'vector_id',
        'categories' // Jika disimpan sebagai JSON
    ];

    // Jika categories disimpan sebagai JSON, tambahkan casting:
    protected $casts = [
        'categories' => 'array'
    ];
}
