<script setup lang="ts">
definePageMeta({
  middleware: ["$auth"],
});
useHead({
  title: "ReadAIbit | Dashboard",
});
</script>

<template>
  <div class="flex items-center justify-center">
    <h1 class="text-3xl font-bold">Dashboard Page</h1>
  </div>
</template>
