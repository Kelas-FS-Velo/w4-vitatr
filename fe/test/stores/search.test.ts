vi.mock("nuxt/app", () => ({
  useFetch: vi.fn(),
}));

import { describe, test, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useSearchStore } from "~/stores/search";
import type { ISearchResponse } from "@/types/search";

describe("Search Store", () => {
  let store: ReturnType<typeof useSearchStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useSearchStore();
    vi.clearAllMocks();
  });

  test("fetchBooks success", async () => {
    const mockResponse: ISearchResponse = {
      query: "fiction",
      search_mode: "hybrid",
      results: [
        {
          id: "1",
          title: "Test Book",
          author: "Jane Doe",
          publication_year: 2021,
          cover_image: "cover.jpg",
          categories: ["fiction"],
        },
      ],
      count: 1,
    };

    const mockFetch = vi.fn().mockResolvedValue({
      data: {
        value: {
          ...mockResponse, // ✅ pastikan struktur valid
        },
      },
      pending: false,
      error: null,
    });

    store.searchQuery = "fiction";
    await store.searchBooks(mockFetch);

    console.log("🔥 Results:", store.searchResults); // debug

    expect(store.searchResults).toHaveLength(1);
    expect(store.searchResults[0].title).toBe("Test Book");
    expect(store.error).toBe(null);
    expect(store.isLoading).toBe(false);
  });
});
