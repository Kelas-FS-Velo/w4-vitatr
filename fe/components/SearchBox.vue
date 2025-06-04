<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
</script>

<template>
  <div
    class="relative w-full max-w-sm items-center bg-amber-200 py-3 rounded-full"
  >
    <Input
      id="search"
      type="text"
      placeholder="Search..."
      class="pl-10 border-none text-lg"
    />
    <span
      class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
    >
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
