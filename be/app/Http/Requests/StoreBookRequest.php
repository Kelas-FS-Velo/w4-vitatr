<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'string'],
            'author' => ['required', 'string'],
            'isbn' => ['required', 'string', 'unique:books,isbn'],
            'description' => ['required', 'string', 'min:10'],
            'publication_year' => ['required', 'integer', 'min:1000', 'max:' . date('Y')],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['string'],
            'stock_available' => ['required', 'integer', 'min:0'],
            'cover_img' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ];
    }

    public function authorize(): bool
    {
        return true; // pastikan validasi ini bisa diakses (atau ubah sesuai kebutuhan)
    }
}
