<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Edit Buku</h1>
    
    <div v-if="isLoading && !book" class="text-center py-8">
      Memuat data buku...
    </div>
    
    <BookForm
      v-if="book"
      :initial-data="book"
      :is-loading="isUpdating"
      @submit="handleSubmit"
    >
      <template #actions>
        <button
          type="button"
          @click="navigateTo('/admin/books')"
          class="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Batal
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          :disabled="isUpdating"
        >
          {{ isUpdating ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
      </template>
    </BookForm>
  </div>
</template>

<script setup lang="ts">
import { useBookStore } from '~/stores/books';
import type { IBook, IBookPayload } from '~/types/books';

const route = useRoute();
const bookStore = useBookStore();
const { isLoading } = storeToRefs(bookStore);

const book = ref<IBook | null>(null);
const isUpdating = ref(false);

const loadBook = async () => {
  try {
    const bookId = route.params.id as string;
    // perlu menambahkan fungsi getBookById di store
    const foundBook = bookStore.books.find(b => b.id === bookId);
    if (foundBook) {
      book.value = { ...foundBook };
    } else {
      // Jika buku tidak ada di store, fetch dari API
      // await bookStore.fetchBookById(bookId);
      // book.value = bookStore.currentBook;
      throw new Error('Buku tidak ditemukan');
    }
  } catch (error) {
    console.error('Gagal memuat buku:', error);
  }
};

const handleSubmit = async (bookData: IBookPayload) => {
  isUpdating.value = true;
  try {
    await bookStore.updateBook(route.params.id as string, bookData);
    navigateTo('/admin/books');
  } catch (error) {
    console.error('Gagal mengupdate buku:', error);
  } finally {
    isUpdating.value = false;
  }
};

onMounted(() => {
  loadBook();
});
</script>