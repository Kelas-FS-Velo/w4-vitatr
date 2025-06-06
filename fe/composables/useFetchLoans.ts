export function useFetchLoans() {
  const loanStore = useLoanStore();
  const { loans, isLoading } = storeToRefs(loanStore);
  const { fetchLoans } = loanStore;

  onMounted(() => {
    fetchLoans();
  });

  return {
    loans,
    isLoading,
    fetchLoans,
  };
}
