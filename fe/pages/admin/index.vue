<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
});
useHead({
  title: "Admin Dashboard",
});
// Contoh data dummy, bisa ambil dari API juga
const stats = [
  { label: "Total Buku", value: 120 },
  { label: "Peminjaman Aktif", value: 35 },
  { label: "User Terdaftar", value: 50 },
];
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="item in stats"
        :key="item.label"
        class="bg-white rounded-xl shadow p-4 text-center"
      >
        <div class="text-gray-500 text-sm">{{ item.label }}</div>
        <div class="text-2xl font-bold">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>
