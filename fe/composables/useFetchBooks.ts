import { useBookStore } from "~/stores/books";

export function useFetchBooks() {
  const bookStore = useBookStore();
  const { books, isLoading } = storeToRefs(bookStore);
  const { fetchBooks } = bookStore;

  onMounted(() => {
    fetchBooks();
  });

  return {
    books,
    isLoading,
    fetchBooks, // bisa dipakai manual kalau perlu
  };
}
