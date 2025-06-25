<script setup lang="ts">
import { useSearchStore } from "@/stores/search";
import type { ISearchFilters } from "@/types/search";

const searchStore = useSearchStore();

// Handle category filter change with proper typing
const handleCategoryChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedCategories = Array.from(target.selectedOptions)
    .map(option => option.value);
  
  searchStore.updateFilters({
    categories: selectedCategories
  });
};

// Handle year filter change with null check
const handleYearChange = (type: 'min' | 'max', event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value ? parseInt(target.value) : undefined;
  
  if (type === 'min') {
    searchStore.updateFilters({ year_min: value });
  } else {
    searchStore.updateFilters({ year_max: value });
  }
};
</script>

<template>
  <div class="search-interface">
    <!-- Search input -->
    <input 
      v-model="searchStore.searchQuery" 
      @keyup.enter="searchStore.searchBooks"
      placeholder="Search for books..."
      class="search-input"
    />
    
    <!-- Filters -->
    <div class="filters">
      <!-- Multi-select categories with proper event handling -->
      <select 
        multiple
        @change="handleCategoryChange"
        class="category-select"
      >
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        <option value="science">Science</option>
        <option value="history">History</option>
      </select>
      
      <!-- Year filters with proper typing -->
      <div class="year-filters">
        <input 
          type="number" 
          @change="handleYearChange('min', $event)"
          placeholder="From year"
          class="year-input"
        />
        <input 
          type="number" 
          @change="handleYearChange('max', $event)"
          placeholder="To year"
          class="year-input"
        />
      </div>
    </div>
    
    <!-- Search button -->
    <button 
      @click="searchStore.searchBooks"
      :disabled="searchStore.isLoading"
      class="search-button"
    >
      {{ searchStore.isLoading ? 'Searching...' : 'Search' }}
    </button>
    
    <!-- Results display -->
    <div v-if="searchStore.isLoading" class="loading">
      Searching...
    </div>
    <div v-else-if="searchStore.error" class="error">
      {{ searchStore.error }}
    </div>
    <div v-else class="results">
      <div 
        v-for="result in searchStore.searchResults" 
        :key="result.id"
        class="book-result"
      >
        <h3>{{ result.title }}</h3>
        <p>By {{ result.author }} ({{ result.publication_year }})</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your component styles here */
.search-input, .category-select, .year-input {
  padding: 8px;
  margin: 5px;
}
.search-button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>