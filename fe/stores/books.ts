import { defineStore } from "pinia";
import { ref } from "vue";
import type { IBook, IBookPayload } from "~/types/books";

export const useBookStore = defineStore("books", () => {
  const books = ref<IBook[]>([]);
  const isLoading = ref(false);

  async function fetchBooks() {
    isLoading.value = true;
    try {
      const data = await useSanctumFetch<IBook[]>("/api/books");
      books.value = data;
    } catch (e) {
      console.error("Failed to fetch books", e);
    } finally {
      isLoading.value = false;
    }
  }

  async function addBook(payload: IBookPayload) {
    try {
      await useSanctumFetch("/api/books", {
        method: "POST",
        body: payload,
      });
      await fetchBooks(); // Refresh list
    } catch (e) {
      console.error("Failed to add book", e);
      throw e;
    }
  }

  async function updateBook(id: number, payload: IBookPayload) {
    try {
      await useSanctumFetch(`/api/books/${id}`, {
        method: "PUT",
        body: payload,
      });
      await fetchBooks(); // Refresh list
    } catch (e) {
      console.error("Failed to update book", e);
      throw e;
    }
  }

  async function deleteBook(id: number) {
    try {
      await useSanctumFetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      await fetchBooks(); // Refresh list
    } catch (e) {
      console.error("Failed to delete book", e);
      throw e;
    }
  }

  return {
    books,
    isLoading,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
  };
});
