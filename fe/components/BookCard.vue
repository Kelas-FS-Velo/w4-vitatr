<template>
  <div class="border p-4 rounded hover:shadow-md transition-shadow">
    <h3 class="font-bold text-lg">{{ book.title }}</h3>
    <p class="text-gray-600">{{ book.author }}</p>
    <p class="text-sm text-gray-500 mt-1">
      {{ book.publication_year }} • {{ book.categories }}
    </p>
    <p class="mt-2 text-gray-700 line-clamp-2">{{ book.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { IBook } from '~/types/books';

defineProps({
  book: {
    type: Object as PropType<IBook>,
    required: true,
  },
});
</script>