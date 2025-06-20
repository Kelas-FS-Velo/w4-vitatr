<template>
  <div
    class="relative w-full max-w-sm items-center bg-secondary py-3 rounded-full px-4"
  >
    <input
      v-model="searchQuery"
      placeholder="🔍 Cari buku... (AI-powered semantic search)"
      class="ai-search-input"
      @keyup.enter="searchBooks"
    />
    <small class="ai-hint"
      >Coba: "Buku petualangan seru dengan karakter kuat"</small
    >
  </div>
</template>

<script setup>
const searchQuery = ref('');
const router = useRouter();
const config = useRuntimeConfig();

const searchBooks = async () => {
  if (!searchQuery.value.trim()) return;

  try {
    // For demonstration, we'll use both direct API call and potential navigation
    // Option 1: Direct API call to your backend
    const { data, error } = await useFetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ query: searchQuery.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (error.value) {
      console.error('Search error:', error.value);
      // Handle error (show toast, etc.)
      return;
    }

    // Option 2: Navigate to search results page if you have one
    // router.push({
    //   path: '/search',
    //   query: { q: searchQuery.value }
    // });

    // Process the results (assuming your backend returns them)
    console.log('Search results:', data.value);
    
    // Emit event if parent component needs to handle results
    emit('search-results', data.value);

  } catch (err) {
    console.error('Failed to search:', err);
  }
};

// Optional: Debounce the search if you want auto-search
// const debouncedSearch = useDebounceFn(searchBooks, 500);
</script>

<style>
.ai-search-input {
  background: url("/magic-wand.svg") no-repeat right 10px center;
  background-size: 20px 20px;
  padding-right: 40px;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
}
.ai-hint {
  color: #666;
  display: block;
  font-style: italic;
  margin-top: 4px;
  padding-left: 8px;
  font-size: 0.75rem;
}
</style>