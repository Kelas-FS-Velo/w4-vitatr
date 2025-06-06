export interface IBook {
  id: number;
  title: string;
  author: string;
  published_at: string;
  available_copies: number;
  total_copies: number;
}

export interface IBookPayload {
  title: string;
  author: string;
  published_at: string;
  available_copies: number;
  total_copies: number;
}
