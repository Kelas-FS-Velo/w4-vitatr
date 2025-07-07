// ~/stores/search.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  ISearchResult,
  ISearchResponse,
  ISearchFilters,
} from "@/types/search";

export const useSearchStore = defineStore("search", () => {
  // State
  const searchQuery = ref("");
  const searchResults = ref<ISearchResult[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref<ISearchFilters>({
    categories: [],
    year_min: undefined,
    year_max: undefined,
    in_stock: false,
  });

  // Auto-select search mode based on query
  const getSearchMode = (query: string) => {
    const isConceptualQuery =
      query.split(" ").length > 2 ||
      query.includes("about") ||
      query.includes("like");
    return isConceptualQuery ? "semantic" : "hybrid";
  };

  // Main search action
  const searchBooks = async (customFetch?: typeof useFetch): Promise<void> => {
    if (!searchQuery.value.trim()) {
      console.log("⛔ Empty query, skipping");
      searchResults.value = [];
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const fetchFn = customFetch || useFetch;
      console.log(
        "🔍 Using fetchFn:",
        fetchFn === customFetch ? "custom" : "default"
      );

      const { data } = await fetchFn<ISearchResponse>("/api/search", {
        method: "POST",
        body: {
          query: searchQuery.value,
          search_mode: getSearchMode(searchQuery.value),
          semantic_weight: 0.7,
          filters: filters.value,
        },
      });

      console.log("📦 Response data:", data?.value);
      searchResults.value = data.value?.results || [];
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to perform search";
      console.error("Search error:", err);
      searchResults.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // Update filters with type safety
  const updateFilters = (newFilters: Partial<ISearchFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  // Clear search
  const clearSearch = () => {
    searchQuery.value = "";
    searchResults.value = [];
    filters.value = {
      categories: [],
      year_min: undefined,
      year_max: undefined,
      in_stock: false,
    };
  };

  return {
    // State
    searchQuery,
    searchResults,
    isLoading,
    error,
    filters,

    // Actions
    searchBooks,
    updateFilters,
    clearSearch,
  };
});
