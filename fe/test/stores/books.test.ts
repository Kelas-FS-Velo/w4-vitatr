import { setActivePinia, createPinia } from "pinia";
import { useBookStore } from "@/stores/books";
import { mockNuxtFetch } from "../utils/mockNuxtFetch";
import type { IBook, IBookPayload, ISearchResult } from "~/types/books";
import { getMockSearchResult } from "../utils/mockSearchResult";

vi.mock("@/composables/useSanctumFetch", () => ({
  useSanctumFetch: vi.fn(),
}));

describe("Book Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  test("fetchBooks success", async () => {
    const mockBooks = [{ id: "1", title: "Book A" }];
    mockNuxtFetch({ response: { data: mockBooks } });

    const store = useBookStore();
    await store.fetchBooks();

    expect(store.books).toEqual(mockBooks);
    expect(store.error).toBeNull();
    expect(store.isLoading).toBe(false);
  });

  test("fetchBooks error", async () => {
    mockNuxtFetch({ response: new Error("Server error"), reject: true });

    const store = useBookStore();
    await store.fetchBooks();

    expect(store.books).toEqual([]);
    expect(store.error).toBe("Server error");
    expect(store.isLoading).toBe(false);
  });

  const existingBook = {
    id: "1",
    title: "Old Title",
    author: "Author",
    isbn: "1111111111",
    description: "Old description",
    publication_year: 2020,
    cover_image: "https://example.com/cover.jpg",
    stock_available: 10,
    categories: ["fiction"],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  } satisfies IBook;

  const updatedBook = {
    ...existingBook,
    title: "Updated Title",
  } satisfies IBook;

  const payload = {
    title: "Updated Title",
    author: "Author",
    isbn: "1111111111",
    description: "Old description",
    publication_year: 2020,
    cover_image: "https://example.com/cover.jpg",
    stock_available: 10,
    categories: ["fiction"],
  } satisfies IBookPayload;
  
  test("addBook success", async () => {
    const mockBook = { id: "2", ...payload } satisfies IBook;

    const mockSanctumFetch = vi.fn().mockResolvedValue({ data: mockBook });
    vi.stubGlobal("useSanctumFetch", mockSanctumFetch);

    const store = useBookStore();
    await store.addBook(payload);

    expect(store.books).toContainEqual(mockBook);
  });
  

  test("updateBook success", async () => {
    const mockSanctumFetch = vi.fn().mockResolvedValue({ data: updatedBook });
    vi.stubGlobal("useSanctumFetch", mockSanctumFetch);

    const store = useBookStore();
    store.books = [existingBook];

    await store.updateBook("1", payload);

    expect(store.books[0].title).toBe("Updated Title");
    expect(mockSanctumFetch).toHaveBeenCalledWith("/api/books/1", {
      method: "PUT",
      body: payload,
    });
  });  

  test("deleteBook success", async () => {
    const mockSanctumFetch = vi.fn().mockResolvedValue({});
    vi.stubGlobal("useSanctumFetch", mockSanctumFetch);

    const store = useBookStore();

    const book1 = {
      id: "1",
      title: "Book A",
      author: "Author A",
      isbn: "1234567890",
      description: "Desc A",
      publication_year: 2020,
      cover_image: "cover1.jpg",
      stock_available: 5,
      categories: ["fiction"],
    } satisfies IBook;

    const book2 = {
      id: "2",
      title: "Book B",
      author: "Author B",
      isbn: "0987654321",
      description: "Desc B",
      publication_year: 2021,
      cover_image: "cover2.jpg",
      stock_available: 7,
      categories: ["non-fiction"],
    } satisfies IBook;

    store.books = [book1, book2];

    await store.deleteBook("1");

    expect(store.books).toHaveLength(1);
    expect(store.books[0].id).toBe("2");
    expect(mockSanctumFetch).toHaveBeenCalledWith("/api/books/1", {
      method: "DELETE",
    });
  });
  
  test("searchBooks success with filters", async () => {
    const mockResults = [
      getMockSearchResult({ id: "1", title: "Book A" }),
      getMockSearchResult({ id: "2", title: "Book B" }),
    ];

    const mock = mockNuxtFetch({ response: { data: mockResults } });

    const store = useBookStore();

    await store.searchBooks("magic", {
      categories: ["fiction"],
      year_min: 2010,
      year_max: 2022,
    });

    expect(store.searchResults).toEqual(mockResults);
    expect(mock).toHaveBeenCalled();
    expect(store.error).toBeNull();
  });
});
