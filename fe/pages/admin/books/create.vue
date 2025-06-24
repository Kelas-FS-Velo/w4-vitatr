<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Tambah Buku Baru</h1>
    
    <BookForm
      :initial-data="initialBookData"
      :is-loading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useBookStore } from '~/stores/books';
import type { IBookPayload } from '~/types/books';

const bookStore = useBookStore();
const { isLoading } = storeToRefs(bookStore);

const initialBookData = ref({
  title: '',
  author: '',
  year: new Date().getFullYear(),
  category: 'Fiction',
  description: '',
});

const handleSubmit = async (bookData: IBookPayload) => {
  try {
    await bookStore.addBook(bookData);
    navigateTo('/admin/books');
  } catch (error) {
    console.error('Gagal menambah buku:', error);
  }
};
</script>