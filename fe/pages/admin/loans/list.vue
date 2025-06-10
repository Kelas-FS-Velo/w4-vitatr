<template>
  <div class="container flex flex-col items-center justify-center space-y-4">
    this is loans list
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "admin", // <== layout ini akan pakai layouts/admin.vue
  middleware: ["admin"],
});

useHead({
  title: "Admin Dashboard",
});
</script>
