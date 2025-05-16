<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class TokenAuthenticationController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first(); // ✅ diperbaiki

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect'],
            ]);
        }

        return [
            'token' => $user->createToken('token-name')->plainTextToken,
            'user' => $user, // ✅ opsional: untuk auto-login di frontend
        ];
    }

    public function destroy(Request $request)
    {
        // Revoke all tokens
        // $request->user()->tokens()->delete();

        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();
    }
}
