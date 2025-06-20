<script setup lang="ts">
const mode = useColorMode();
const toggleTheme = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <button
    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background"
  >
    <Icon
      @click="toggleTheme"
      :name="mode.value === 'dark' ? 'heroicons:moon' : 'heroicons:sun'"
      class="h-5 w-5"
    />
  </button>
</template>
