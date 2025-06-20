<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
</script>

<template>
  <div
    class="relative w-full max-w-sm items-center bg-secondary py-3 rounded-full px-4"
  >
    <input
      id="search"
      type="text"
      placeholder="Search..."
      class="w-full rounded-full border-none outline-none px-10 py-2 text-lg text-primary bg-transparent"
    />

    <span
      class="absolute start-0 inset-y-0 flex items-center justify-center px-6"
    >
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
