<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Daftar Buku</h1>
      <NuxtLink
        to="/admin/books/create"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Tambah Buku
      </NuxtLink>
    </div>

    <div v-if="isLoading && books.length === 0" class="text-center py-8">
      Memuat daftar buku...
    </div>

    <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
      {{ error }}
    </div>

    <BooksTable
      :books="books"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { useBookStore } from '~/stores/books';

const bookStore = useBookStore();
const { books, isLoading, error } = storeToRefs(bookStore);

const handleEdit = (bookId: string) => {
  navigateTo(`/admin/books/edit/${bookId}`);
};

const handleDelete = async (bookId: string) => {
  if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
    try {
      await bookStore.deleteBook(bookId);
    } catch (error) {
      console.error('Gagal menghapus buku:', error);
    }
  }
};

onMounted(() => {
  bookStore.fetchBooks();
});
</script>