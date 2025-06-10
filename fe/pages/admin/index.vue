<script setup lang="ts">
definePageMeta({
  layout: "admin", // <== layout ini akan pakai layouts/admin.vue
  middleware: ["admin"],
});

useHead({
  title: "Admin Dashboard",
});
</script>

<template>
  <!-- Main Section -->
  <main class="w-full py-5 lg:pl-8">
    <div class="space-y-6">
      <StatusCard />
      <SearchAdmin />
      <BookListBox />
      <RecentBorrows />
    </div>
  </main>
</template>
