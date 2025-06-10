<!-- layouts/admin.vue -->
<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
  <div class="">
    <!-- Header -->
    <HeaderAdmin v-model:isOpen="isOpen" />
    <MobileMenu v-model:isOpen="isOpen" />
    <!-- Layout Container -->
    <div class="flex max-w-[1440px] mx-auto px-4 lg:px-8">
      <!-- Sidebar -->
      <SidebarAdmin
        class="sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 py-5 lg:block flex-shrink-0"
      />
      <slot />
    </div>
  </div>
</template>
