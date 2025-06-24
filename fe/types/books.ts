export type BookCategory =
  | "children"
  | "adventure"
  | "fiction"
  | "non-fiction"
  | "science"
  | "history";

export interface IBook {
  id: string; // UUID format
  title: string;
  author: string;
  isbn: string; // Format ISBN
  description: string; // Untuk semantic search
  publication_year: number;
  cover_image: string; // URL atau path ke gambar
  categories: BookCategory[]; // Array dari kategori/tag
  stock_available: number;
  vector_id?: string; // Opsional: ID vektor di Qdrant
  score?: number; // Only present in search results
}

export interface IBookPayload {
  title: string;
  author: string;
  isbn?: string; // Opsional jika tidak semua buku perlu ISBN
  description: string;
  publication_year?: number; // Opsional
  categories: BookCategory[];
  stock_available?: number; // Default bisa 0
}
