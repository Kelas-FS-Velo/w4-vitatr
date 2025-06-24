import type { BookCategory, IBook, IBookPayload } from "./books";

export interface BookApiResponse {
  data: IBook[];
  total: number; // Untuk pagination
  page: number;
}
export type SearchResults = IBook[];

export interface SearchFilters {
  categories?: string[];
  year_min?: number;
  year_max?: number;
}

export interface ISearchResult {
  id: string;
  score: number; // Similarity score 0-1 dari Qdrant
  payload: {
    title: string;
    author: string;
    cover_image: string;
    categories: BookCategory[];
    publication_year?: number;
  };
  vector_id?: string;
}

// Type khusus hasil search
export interface IBookSearchResult {
  score: number; // Wajib: similarity score dari Qdrant (0-1)
  highlights?: {
    // Opsional: untuk UI highlighting
    field: "title" | "description";
    matched_text: string;
  }[];
  data: IBook; // atau Pick<IBook, 'id' | 'title' | ...> untuk payload ringkas
}

// Type Safety untuk Qdrant Response:
export interface IQdrantSearchResponse {
  id: string;
  score: number;
  payload: Omit<IBook, "id">;
}
