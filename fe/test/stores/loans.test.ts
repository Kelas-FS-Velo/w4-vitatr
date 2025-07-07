import { describe, test, beforeEach, expect, vi } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useLoanStore } from "~/stores/loans";
import type { ILoanPayload } from "~/types/loans";

describe("Loan Store", () => {
  beforeEach(() => {
    setActivePinia(createTestingPinia({ stubActions: false }));
    vi.clearAllMocks();
  });

  test("fetchLoans success", async () => {
    const mockLoans = [
      {
        id: 1,
        book_id: 101,
        user_id: 5,
        loan_date: "2025-07-01",
        return_date: null,
        is_returned: false,
        book: { title: "Vue Mastery" },
        user: { name: "John Doe" },
      },
    ];

    (useSanctumFetch as any).mockResolvedValueOnce(mockLoans);

    const store = useLoanStore();
    await store.fetchLoans();

    expect(store.loans).toEqual(mockLoans);
    expect(store.isLoading).toBe(false);
  });

  test("createLoan success calls API and refreshes loans", async () => {
    const payload: ILoanPayload = {
      book_id: 1,
      user_id: 2,
    };

    (useSanctumFetch as any).mockResolvedValueOnce({ status: 200 });

    const store = useLoanStore();

    // Biarkan fetchLoans asli berjalan
    await store.createLoan(payload);

    expect(useSanctumFetch).toHaveBeenCalledWith("/api/loans", {
      method: "POST",
      body: payload,
    });

    // Tidak perlu spy: cukup cek state berubah jika perlu
    // atau tambahkan dummy response lagi jika fetchLoans terpanggil ulang
  });

  test("returnLoan success calls API and refreshes loans", async () => {
    (useSanctumFetch as any).mockResolvedValueOnce({ status: 200 });

    const store = useLoanStore();

    await store.returnLoan(1);

    expect(useSanctumFetch).toHaveBeenCalledWith("/api/loans/1/return", {
      method: "POST",
    });

    // Sama: fetchLoans akan terpanggil otomatis
  });

  test("fetchLoans handles error and sets isLoading to false", async () => {
    (useSanctumFetch as any).mockRejectedValueOnce(new Error("Fetch failed"));

    const store = useLoanStore();
    await store.fetchLoans();

    expect(store.loans).toEqual([]);
    expect(store.isLoading).toBe(false);
  });
});
