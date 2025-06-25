export type BookCategory =
  | "children"
  | "adventure"
  | "fiction"
  | "non-fiction"
  | "science"
  | "history"
  | string; // Allow for custom categories

export interface IBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  publication_year: number;
  cover_image: string; // URL to the image
  stock_available: number;
  categories: BookCategory[];
  vector_id?: string; // Optional for vector search
  created_at?: string;
  updated_at?: string;
}

export interface IBookPayload {
  title: string;
  author: string;
  isbn: string;
  description: string;
  publication_year: number;
  cover_image: File | string; // Can be either File (upload) or string (URL)
  stock_available: number;
  categories: BookCategory[];
}

// For search results
export interface ISearchResult {
  id: string;
  title: string;
  author: string;
  publication_year: number;
  cover_image: string;
  categories: BookCategory[];
  score?: number; // For search relevance scoring
  highlight?: {
    // For search term highlighting
    description?: string[];
    title?: string[];
  };
}

// API Response Types
export interface ApiListResponse<T> {
  data: T[];
  meta?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface ApiSingleResponse<T> {
  data: T;
}

// For search filters
export interface BookSearchFilters {
  categories?: BookCategory[];
  year_min?: number;
  year_max?: number;
  in_stock?: boolean;
}
