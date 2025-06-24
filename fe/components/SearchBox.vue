<template>
  <div class="search-container">
    <div class="flex gap-4 mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Judul buku, penulis..."
        class="flex-1 p-2 border rounded"
      />
      <button
        @click="emitSearch"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        :disabled="isLoading"
      >
        {{ isLoading ? "Mencari..." : "Cari" }}
      </button>
    </div>

    <!-- Filter Pencarian -->
    <div class="bg-gray-100 p-4 rounded mb-4">
      <h3 class="font-semibold mb-2">Filter</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block mb-1">Kategori</label>
          <select
            v-model="selectedCategories"
            multiple
            class="w-full p-2 border rounded"
          >
            <option
              v-for="category in bookCategories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <label class="block mb-1">Tahun Minimal</label>
          <input
            v-model.number="yearMin"
            type="number"
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label class="block mb-1">Tahun Maksimal</label>
          <input
            v-model.number="yearMax"
            type="number"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookCategory } from "~/types/books";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["search"]);

const searchQuery = ref("");
const selectedCategories = ref<BookCategory[]>([]);
const yearMin = ref<number | undefined>();
const yearMax = ref<number | undefined>();

const bookCategories: BookCategory[] = [
  "children",
  "adventure",
  "fiction",
  "non-fiction",
  "science",
  "history",
];

const emitSearch = () => {
  emit("search", {
    query: searchQuery.value,
    filters: {
      categories: selectedCategories.value,
      year_min: yearMin.value,
      year_max: yearMax.value,
    },
  });
};
</script>
