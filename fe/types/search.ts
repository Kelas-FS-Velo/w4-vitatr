import type { IBook } from "./books";

export interface BookApiResponse {
  data: IBook[];
  total: number; // Untuk pagination
  page: number;
}
export type SearchResults = IBook[];
