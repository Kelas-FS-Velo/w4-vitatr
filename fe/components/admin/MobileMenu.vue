<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();
const emit = defineEmits(["update:isOpen"]);

const close = () => emit("update:isOpen", false);
</script>

<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
      @click.self="close"
    >
      <div
        class="fixed top-0 left-0 z-50 h-full w-64 bg-white/70 shadow-lg px-4 py-4"
      >
        <!-- Close Button -->
        <button
          @click="close"
          aria-label="Close menu"
          class="mb-4 flex h-9 w-9 items-center justify-center rounded-full border bg-background"
        >
          <Icon name="heroicons:x-mark" />
        </button>

        <!-- Sidebar Content -->
        <SidebarAdmin />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
