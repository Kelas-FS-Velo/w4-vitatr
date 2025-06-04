<?php

namespace App\Http\Controllers;
use App\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoanController extends Controller
{
    public function index()
    {
        return Loan::with(['book', 'user'])->get();

        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->whereNull('returned_at');
            } elseif ($request->status === 'returned') {
                $query->whereNotNull('returned_at');
            }
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'borrowed_at' => 'required|date',
            'due_at' => 'required|date|after_or_equal:borrowed_at',
        ]);

        $userId = Auth::id();

        // Validasi: user sudah meminjam buku ini dan belum dikembalikan
        $existingLoan = Loan::where('user_id', $userId)
            ->where('book_id', $validated['book_id'])
            ->whereNull('returned_at')
            ->first();

        if ($existingLoan) {
            return response()->json([
                'message' => 'Kamu masih meminjam buku ini.'
            ], 400);
        }

        $loan = Loan::create([
            'user_id' => $userId,
            ...$validated
        ]);

        return response()->json($loan, 201);
    }

    public function returnBook(Loan $loan)
    {
        $loan->update([
            'returned_at' => now()
        ]);

        return $loan;
    }
}
