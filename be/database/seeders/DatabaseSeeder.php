<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Buat 1 user biasa dengan factory
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('user123'), // hash password
            'role' => 'user', // asumsikan kamu sudah tambahkan kolom role
        ]);

        // Buat user admin secara manual
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@library.com',
            'password' => Hash::make('admin123'), // hash password
            'role' => 'admin',
        ]);
    }
}
