<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const auth = useAuthStore();
await auth.fetchUser(); // Pastikan user di-load saat halaman load
</script>

