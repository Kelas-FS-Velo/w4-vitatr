<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
// import { useBookStore } from '@/stores/books'
// import BookCard from '@/components/BookCard.vue'

const store = useBookStore();

const currentPage = ref(1);
const perPage = 8;

onMounted(() => {
  if (!store.books.length) {
    store.fetchBooks();
  }
});

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return store.books.slice(start, start + perPage);
});

function nextPage() {
  if (currentPage.value * perPage < store.books.length) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<template>
  <div class="mt-5">
    <p class="font-bold">Book List</p>

    <div class="w-full flex justify-end pr-6 gap-2 mb-2">
      <button @click="prevPage" :disabled="currentPage === 1">
        <Icon name="heroicons:chevron-left" />
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage * perPage >= store.books.length"
      >
        <Icon name="heroicons:chevron-right" />
      </button>
    </div>

    <div
      class="h-[300px] rounded-lg border bg-white dark:bg-zinc-900 md:p-3 overflow-hidden"
    >
      <div class="grid grid-cols-4 gap-4 h-full">
        <!-- Loading -->
        <template v-if="store.isLoading">
          <div
            v-for="i in perPage"
            :key="i"
            class="h-24 rounded-lg bg-muted animate-pulse"
          ></div>
        </template>

        <!-- Empty -->
        <template v-else-if="!store.books.length">
          <div
            class="col-span-4 flex flex-col items-center justify-center text-muted-foreground"
          >
            <Icon name="heroicons:book-open" class="w-8 h-8 mb-2" />
            <p>No books found.</p>
          </div>
        </template>

        <!-- Book Cards -->
        <template v-else>
          <BookCard
            v-for="book in paginatedBooks"
            :key="book.id"
            :book="book"
          />
        </template>
      </div>
    </div>
  </div>
</template>
