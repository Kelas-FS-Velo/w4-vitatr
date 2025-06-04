import { defineStore } from "pinia";
import { ref } from "vue";
import type { IBook } from "~/types/book";

export const useBookStore = defineStore("book", () => {
  const books = ref<IBook[]>([]);

  const config = useRuntimeConfig();
  const api = config.public.API_URL + "/books";

  async function fetchBooks(): Promise<void> {
    const { data } = await useFetch<IBook[]>(`${api}`);
    books.value = data.value || [];
  }

  async function addBook(book: Omit<IBook, "id">): Promise<void> {
    const { data } = await useFetch<IBook>(api, {
      method: "POST",
      body: book,
    });
    if (data.value) books.value.push(data.value);
  }

  async function updateBook(id: number, book: Partial<IBook>): Promise<void> {
    const { data } = await useFetch<IBook>(`${api}/${id}`, {
      method: "PUT",
      body: book,
    });
    const idx = books.value.findIndex((b) => b.id === id);
    if (idx !== -1 && data.value) books.value[idx] = data.value;
  }

  async function deleteBook(id: number): Promise<void> {
    await useFetch(`${api}/${id}`, { method: "DELETE" });
    books.value = books.value.filter((b) => b.id !== id);
  }

  return { books, fetchBooks, addBook, updateBook, deleteBook };
});
