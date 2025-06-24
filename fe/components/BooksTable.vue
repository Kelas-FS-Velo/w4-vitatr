<template>
  <div>
    <div v-if="books.length > 0" class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Judul</th>
            <th class="py-2 px-4 border-b">Penulis</th>
            <th class="py-2 px-4 border-b">Tahun</th>
            <th class="py-2 px-4 border-b">Kategori</th>
            <th class="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td class="py-2 px-4 border-b">{{ book.title }}</td>
            <td class="py-2 px-4 border-b">{{ book.author }}</td>
            <td class="py-2 px-4 border-b">{{ book.publication_year }}</td>
            <td class="py-2 px-4 border-b">{{ book.categories }}</td>
            <td class="py-2 px-4 border-b">
              <button
                @click="$emit('edit', book.id)"
                class="text-blue-500 hover:text-blue-700 mr-2"
              >
                Edit
              </button>
              <button
                @click="$emit('delete', book.id)"
                class="text-red-500 hover:text-red-700"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-12 text-gray-500">
      Tidak ada buku yang tersedia
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBook } from '~/types/books';

defineProps({
  books: {
    type: Array as PropType<IBook[]>,
    required: true,
  },
});

defineEmits(['edit', 'delete']);
</script>