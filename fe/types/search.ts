import type { BookCategory, IBook, IBookPayload } from "./books";

export interface BookApiResponse {
  data: IBook[];
  total: number; // Untuk pagination
  page: number;
}
export type SearchResults = IBook[];

export interface ISearchResult {
  score: number; // Similarity score 0-1 dari Qdrant
  book: IBook | IBookPayload; // Data lengkap buku
  // atau gunakan payload minimal:
  payload: {
    id: string;
    title: string;
    author: string;
    cover_image: string;
    categories: BookCategory[];
  };
}

// Type khusus hasil search
export interface IBookSearchResult {
  score: number; // Wajib: similarity score dari Qdrant (0-1)
  highlights?: { // Opsional: untuk UI highlighting
    field: 'title' | 'description';
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