import { defineStore } from "pinia";
import { ref } from "vue";
// import { useFetchApi } from "@/composables/useFetchApi";

export const useLoanStore = defineStore("loan", () => {
  const loans = ref([]);
  const loading = ref(false);

  const fetchLoans = async () => {
    loading.value = true;
    const { data, error } = await useFetchApi("/loans");
    if (!error.value) loans.value = data.value;
    loading.value = false;
  };

  const createLoan = async (payload: {
    book_id: number;
    borrowed_at: string;
    due_at: string;
  }) => {
    return await useFetchApi("/loans", {
      method: "POST",
      body: payload,
    });
  };

  const returnLoan = async (loanId: number) => {
    return await useFetchApi(`/loans/${loanId}/return`, {
      method: "PATCH",
    });
  };

  return { loans, loading, fetchLoans, createLoan, returnLoan };
});
