import type { ISearchResult } from "@/types/search";

export function getMockSearchResult(
  overrides: Partial<ISearchResult> = {}
): ISearchResult {
  return {
    id: "s1",
    title: "Search Result 1",
    author: "Author 1",
    publication_year: 2020,
    cover_image: "cover1.jpg",
    categories: ["fiction"],
    score: 0.95,
    highlight: {
      title: ["<em>Search</em> Result 1"],
    },
    metadata: {
      text_score: 0.8,
      semantic_score: 0.9,
      hybrid_score: 0.85,
      is_available: true,
    },
  };
}
