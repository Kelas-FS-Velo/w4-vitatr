export type BookCategory =
  | "children"
  | "adventure"
  | "fiction"
  | "non-fiction"
  | "science"
  | "history"
  | string; // Allow for custom categories

export interface ISearchResult {
  id: string;
  title: string;
  author: string;
  publication_year: number;
  cover_image: string;
  categories: BookCategory[];
  score?: number;
  highlight?: {
    title?: string[];
    description?: string[];
    author?: string[];
  };
  // Additional metadata for search results
  metadata?: {
    text_score?: number;
    semantic_score?: number;
    hybrid_score?: number;
    is_available?: boolean;
  };
}

export interface ISearchResponse {
  query: string;
  search_mode: "text" | "semantic" | "hybrid";
  semantic_weight?: number;
  results: ISearchResult[];
  count: number;
  filters?: {
    categories?: BookCategory[];
    year_min?: number;
    year_max?: number;
  };
  pagination?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface ISearchFilters {
  categories?: BookCategory[];
  year_min?: number;
  year_max?: number;
  in_stock?: boolean;
  limit?: number;
  threshold?: number;
}

export interface ISearchParams {
  query: string;
  filters?: ISearchFilters;
  search_mode?: "text" | "semantic" | "hybrid";
  semantic_weight?: number;
  page?: number;
}

// export interface ISearchParams {
//   query: string;
//   filters?: {
//     categories?: string[];
//     year_min?: number;
//     year_max?: number;
//     in_stock?: boolean;
//   };
//   search_mode: "text" | "semantic" | "hybrid";
//   semantic_weight?: number;
//   limit?: number;
//   threshold?: number;
// }