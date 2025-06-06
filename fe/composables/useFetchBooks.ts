import type { IBook } from "~/types/book";

export function useFetchBooks() {
  const books = ref<IBook[]>([]);
  const isLoading = ref(false);

  async function fetch() {
    isLoading.value = true;
    try {
      books.value = await useSanctumFetch("/api/books");
    } catch (e) {
      console.error("Error fetching books", e);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    books,
    isLoading,
    fetch,
  };
}
