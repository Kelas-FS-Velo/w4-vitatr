<template>
  <div class="mt-5">
    <p class="font-bold">Book List</p>
    <div class="w-full flex justify-end pr-6">
      <Icon name="heroicons:chevron-left" />
      <Icon name="heroicons:chevron-right" />
    </div>

    <div
      class="mt-5 h-[300px] rounded-lg border bg-white dark:bg-zinc-900 md:p-3"
    >
      <div class="grid grid-cols-4 gap-4 row-cols-2 h-full">
        <div
          class="border border-1 rounded-lg bg-secondary flex items-center justify-center p-4"
        >
          box 1
        </div>
        <div
          class="border border-1 rounded-lg bg-secondary flex items-center justify-center p-4"
        >
          box 2
        </div>
        <div
          class="border border-1 rounded-lg bg-secondary flex items-center justify-center p-4"
        >
          box 3
        </div>
        <div
          class="border border-1 rounded-lg bg-secondary flex items-center justify-center p-4"
        >
          box 4
        </div>
        <div
          class="border border-1 rounded-lg bg-secondary flex items-center justify-center p-4"
        >
          box 1
        </div>
        <div
          class="border border-1 rounded-lg bg-secondary flex items-center justify-center p-4"
        >
          box 2
        </div>
        <div
          class="border border-1 rounded-lg bg-secondary flex items-center justify-center p-4"
        >
          box 3
        </div>
        <div
          class="border border-1 rounded-lg bg-secondary flex items-center justify-center p-4"
        >
          box 4
        </div>
      </div>
      <!-- <Line :data="data" :options="options" /> -->
    </div>
  </div>
</template>
