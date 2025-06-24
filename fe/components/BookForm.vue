<template>
  <form @submit.prevent="$emit('submit', formData)">
    <div class="space-y-4 max-w-2xl">
      <div>
        <label class="block mb-1">Judul</label>
        <input
          v-model="formData.title"
          type="text"
          required
          class="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label class="block mb-1">Penulis</label>
        <input
          v-model="formData.author"
          type="text"
          required
          class="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label class="block mb-1">Tahun</label>
        <input
          v-model.number="formData.publication_year"
          type="number"
          required
          class="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label class="block mb-1">Kategori</label>
        <select
          v-model="formData.categories"
          required
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
        <label class="block mb-1">Deskripsi</label>
        <textarea
          v-model="formData.description"
          rows="4"
          class="w-full p-2 border rounded"
        ></textarea>
      </div>
      <div class="flex justify-end gap-2 mt-6">
        <slot name="actions">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            :disabled="isLoading"
          >
            {{ isLoading ? "Menyimpan..." : "Simpan" }}
          </button>
        </slot>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { BookCategory, IBookPayload } from "~/types/books";

const props = defineProps({
  initialData: {
    type: Object as PropType<IBookPayload>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const formData = ref({ ...props.initialData });

const bookCategories: BookCategory[] = [
  "children",
  "adventure",
  "fiction",
  "non-fiction",
  "science",
  "history",
];
</script>
