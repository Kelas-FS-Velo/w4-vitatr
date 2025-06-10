<template>
  <section class="mt-5">
    <p class="font-bold">Search</p>
    <div
      class="mt-5 flex w-full items-center justify-center gap-6 rounded-lg border bg-background px-5 py-5"
    >
      <SearchBox />
      <SearchBox />
      <!-- <div class="flex shrink-0 flex-col items-center gap-2">
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
        >
          <Icon name="heroicons:plus" class="h-5 w-5" />
        </button>
        <div>
          <p class="text-sm font-semibold">Add</p>
        </div>
      </div>
      <div>Search</div> -->
      <!-- <template v-for="n in data">
        <div class="flex shrink-0 flex-col items-center gap-2">
          <img
            class="h-10 w-10 rounded-full object-cover"
            :src="n.picture.thumbnail"
            :alt="n.name.first"
          />
          <div class="text-center">
            <p class="text-sm font-semibold">
              {{ n.name.first }} {{ n.name.last }}
            </p>
            <p class="text-xs text-muted-foreground">10 mins ago</p>
          </div>
        </div>
      </template> -->
    </div>
  </section>
</template>

<script setup lang="ts">

</script>
