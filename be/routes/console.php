<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


// BOOK
// Route::apiResource('books', [BookController::class]);


// // COVER
// Route::post('/upload-cover', function (Request $request) {
//     $request->validate(['file' => 'required|image|max:2048']);
//     $path = $request->file('file')->store('covers', 'public');
//     return ['url' => asset("storage/$path")];
// });
