<script setup lang="ts">
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
</script>

<template>
  <div class="bg-amber-200 py-3 rounded-full w-full">
    <!-- <Label for="picture">📚 Browse the Library</Label> -->
    <Input id="picture" type="file" class="border-none" />
  </div>
</template>
