import { defineStore } from "pinia";
import { ref } from "vue";
import type { IBook } from "~/types/books";
import type { SearchResults } from "~/types/search";

export const useSearchStore = defineStore("search", () => {
  const searchQuery = ref<string>("");
  const searchResults = ref<IBook[]>([]); // <-- this is Book[]
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const searchBooks = async (): Promise<void> => {
    if (!searchQuery.value.trim()) return;

    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await useFetch<SearchResults>("/api/search", {
        method: "POST",
        body: JSON.stringify({ query: searchQuery.value }),
      });

      searchResults.value = data.value || [];
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Gagal melakukan pencarian";
      console.error("Search error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    searchQuery,
    searchResults,
    isLoading,
    error,
    searchBooks,
  };
});
