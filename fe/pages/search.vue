<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Cari Buku</h1>
    
    <SearchBox @search="handleSearch" :isLoading="isLoading" />
    
    <!-- Hasil Pencarian -->
    <div v-if="processedResults.length > 0" class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Hasil Pencarian</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <BookCard
          v-for="book in processedResults"
          :key="book.id"
          :book="book"
        />
      </div>
    </div>
    
    <div v-else-if="!isLoading" class="text-center py-12 text-gray-500">
      Tidak ada hasil pencarian
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookStore } from '~/stores/books';
import type { BookCategory, IBook } from '~/types/books';
import type { ISearchResult } from '~/types/search';

const bookStore = useBookStore();
const { searchResults, isLoading } = storeToRefs(bookStore);

// Konversi hasil pencarian ke format IBook
const processedResults = computed(() => {
  return searchResults.value.map((result: ISearchResult) => ({
    id: result.id,
    title: result.payload.title,
    author: result.payload.author,
    isbn: '', // Isi default jika tidak ada
    description: '', // Isi default jika tidak ada
    publication_year: result.payload.publication_year || 0,
    cover_image: result.payload.cover_image,
    categories: result.payload.categories || [], // Ambil kategori pertama
    stock_available: 0, // Isi default jika tidak ada
    vector_id: result.vector_id // Jika ada di hasil search
  } as IBook));
});

const handleSearch = (params: {
  query: string;
  filters: {
    categories?: BookCategory[];
    year_min?: number;
    year_max?: number;
  };
}) => {
  bookStore.searchBooks(params.query, params.filters);
};
</script>