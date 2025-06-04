<template>
  <div class="px-6 pt-8 pb-20 md:pt-5 md:pb-10">
    <div class="container mx-auto">
      <div class="md:flex items-center">
        <!-- Text Section -->
        <Transition name="fade-slide-right">
          <div v-if="showContent" class="md:w-[478px]">
            <div
              class="text-sm inline-flex border bg-accent border-primary/10 px-3 py-1 rounded-lg tracking-tight text-primary"
            >
              Your AI-powered reading buddy is here
            </div>
            <h1
              class="font-dynapuff text-5xl md:text-7xl font-bold tracking-wide bg-gradient-to-b from-orange-400 to-orange-700 text-transparent bg-clip-text mt-6"
            >
              ReadAIbit
            </h1>
            <p class="text-xl tracking-tight mt-6">
              Let our AI help you find the perfect book — fast, fun, and just
              your vibe. Search by text or image — just type it, snap it, and
              start reading.
            </p>
            <div class="flex flex-col gap-1 items-center mt-8">
              <div class="flex justify-between items-center w-full px-4">
                <p class="font-medium tracking-tight">🔍 Try the AI Search</p>
                <p class="font-medium tracking-tight">📚 Browse the Library</p>
              </div>
              <div class="flex gap-1 items-center">
                <SearchBox />
                <ImageSearchBox />
              </div>
              <p class="text-sm">✨ Powered by AI. Inspired by curi🥕sity</p>
            </div>
          </div>
        </Transition>
        <!-- Image Section -->
        <Transition name="fade-slide-left">
          <div
            v-if="showContent"
            class="mt-20 md:mt-0 md:h-[648px] md:flex-1 flex justify-end"
          >
            <img src="/carrot.png" alt="carrot" class="max-w-full h-auto" />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

useHead({
  title: "ReadAIbit",
});

const showContent = ref(false);

onMounted(() => {
  setTimeout(() => {
    showContent.value = true;
  }, 600); // Delay sedikit agar transisi terlihat
});
</script>
<style scoped>
.fade-slide-right-enter-active,
.fade-slide-left-enter-active {
  transition: all 1s ease-in-out;
  opacity: 1;
}
.fade-slide-right-enter-from {
  transform: translateX(-50px);
  opacity: 0;
}
.fade-slide-left-enter-from {
  transform: translateX(50px);
  opacity: 0;
}
</style>
