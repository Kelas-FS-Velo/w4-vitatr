<script setup lang="ts">
definePageMeta({
  middleware: ['admin'],
});

const books = ref([1,2,3,4,5])
const config = useRuntimeConfig()
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <h1 class="text-3xl font-bold">Ini list dan kelola buku</h1>
  </div>
</template>
