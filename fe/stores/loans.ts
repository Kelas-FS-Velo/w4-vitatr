import { defineStore } from "pinia";
import { ref } from "vue";
import type { ILoan, ILoanPayload } from "~/types/loans";

export const useLoanStore = defineStore("loans", () => {
  const loans = ref<ILoan[]>([]);
  const isLoading = ref(false);

  async function fetchLoans() {
    isLoading.value = true;
    try {
      const data = await useSanctumFetch<ILoan[]>("/api/loans");
      loans.value = data;
    } catch (e) {
      console.error("Failed to fetch loans", e);
    } finally {
      isLoading.value = false;
    }
  }

  async function createLoan(payload: ILoanPayload) {
    try {
      await useSanctumFetch("/api/loans", {
        method: "POST",
        body: payload,
      });
      await fetchLoans(); // Refresh list
    } catch (e) {
      console.error("Failed to create loan", e);
      throw e;
    }
  }

  async function returnLoan(id: number) {
    try {
      await useSanctumFetch(`/api/loans/${id}/return`, {
        method: "POST",
      });
      await fetchLoans(); // Refresh list
    } catch (e) {
      console.error("Failed to return loan", e);
      throw e;
    }
  }

  return {
    loans,
    isLoading,
    fetchLoans,
    createLoan,
    returnLoan,
  };
});
