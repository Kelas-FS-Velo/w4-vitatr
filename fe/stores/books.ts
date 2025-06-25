import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  ApiSingleResponse,
  ApiListResponse,
  BookCategory,
  IBook,
  IBookPayload,
} from "@/types/books";
import type { ISearchResult } from "~/types/search";

export const useBookStore = defineStore("books", () => {
  // State
  const books = ref<IBook[]>([]);
  const searchResults = ref<ISearchResult[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Fetch books (public endpoint) - returns multiple books
  async function fetchBooks() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await $fetch<ApiListResponse<IBook>>("/api/books");
      books.value = response.data || [];
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch books";
      console.error("Failed to fetch books", err);
    } finally {
      isLoading.value = false;
    }
  }

  // Add book - returns single book
  async function addBook(payload: IBookPayload) {
    isLoading.value = true;
    try {
      const response = await useSanctumFetch<ApiSingleResponse<IBook>>(
        "/api/books",
        {
          method: "POST",
          body: payload,
        }
      );

      if (response.data) {
        books.value.push(response.data);
      }
      return response.data;
    } catch (err) {
      console.error("Failed to add book", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // Update book - returns single book
  async function updateBook(id: string, payload: IBookPayload) {
    isLoading.value = true;
    try {
      const response = await useSanctumFetch<ApiSingleResponse<IBook>>(
        `/api/books/${id}`,
        {
          method: "PUT",
          body: payload,
        }
      );

      if (response.data) {
        const index = books.value.findIndex((book) => book.id === id);
        if (index !== -1) {
          books.value[index] = response.data;
        }
      }
      return response.data;
    } catch (err) {
      console.error("Failed to update book", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // Search books (public endpoint) - returns multiple results
  async function searchBooks(
    query: string,
    filters?: {
      categories?: BookCategory[];
      year_min?: number;
      year_max?: number;
    }
  ) {
    isLoading.value = true;
    error.value = null;

    try {
      const params = new URLSearchParams({ query });

      if (filters?.categories) {
        filters.categories.forEach((cat) =>
          params.append("filters[categories][]", cat)
        );
      }
      if (filters?.year_min) {
        params.set("filters[year_min]", filters.year_min.toString());
      }
      if (filters?.year_max) {
        params.set("filters[year_max]", filters.year_max.toString());
      }

      const response = await $fetch<ApiListResponse<ISearchResult>>(
        `/api/search?${params.toString()}`
      );

      searchResults.value = response.data || [];
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to search books";
      searchResults.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  // Delete book (protected endpoint) - no response data needed
  async function deleteBook(id: string) {
    isLoading.value = true;
    error.value = null;
    try {
      await useSanctumFetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      books.value = books.value.filter((book) => book.id !== id);
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to delete book";
      console.error("Failed to delete book", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    books,
    searchResults,
    isLoading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    searchBooks,
    deleteBook,
  };
});
