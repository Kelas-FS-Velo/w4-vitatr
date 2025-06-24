<template>
  <div
    class="border border-1 rounded-lg bg-secondary flex items-center justify-center p-4"
  >
    <p class="text-sm font-medium">{{ book.title }}</p>
  </div>
</template>

<script setup lang="ts">
import type { IBook } from "~/types/books";

defineProps<{
  book: IBook;
}>();
</script>
