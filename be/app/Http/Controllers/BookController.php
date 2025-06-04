<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BookController extends Controller
{
    public function index() {
        return Book::all();
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'published_year' => 'required|digits:4|integer',
            'isbn' => 'required|unique:books',
            'category' => 'required|string',
            'cover_img' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);
        $path = $request->file('cover_img')->store('covers', 'public');

        $book = Book::create([
            ...$validated,
            'cover_img' => '/storage/' . $path,
        ]);

        return response()->json($book, 201);
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return response()->noContent();
    }

    public function show(Book $book)
    {
        return $book;
    }

    public function update(Request $request, Book $book) {
        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'published_year' => 'required|digits:4|integer',
            'isbn' => 'required|unique:books,isbn,' . $book->id,
            'category' => 'required|string',
            'cover_img' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('cover_img')) {
            $path = $request->file('cover_img')->store('covers', 'public');
            $validated['cover_img'] = '/storage/' . $path;
        }

        $book->update($validated);
        return $book;
    }
}
