<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
</script>

<template>
  <div
    class="relative w-full max-w-sm items-center bg-secondary py-3 rounded-full px-4"
  >
    <Input
      id="search"
      type="text"
      placeholder="Search..."
      class="pl-10 text-lg text-primary !ring-0 !ring-transparent !focus-visible:ring-0 !focus-visible:ring-transparent !border-none !outline-none"
    />
    <span
      class="absolute start-0 inset-y-0 flex items-center justify-center px-6"
    >
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
