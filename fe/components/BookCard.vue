<template>
  <div
    class="border border-1 rounded-lg bg-secondary flex items-center justify-center p-4"
  >
    <p class="text-sm font-medium">{{ book.title }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  book: {
    id: number;
    title: string;
    // tambah field lainnya jika perlu
  };
}>();
</script>
