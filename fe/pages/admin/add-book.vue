<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";

definePageMeta({
  middleware: ["admin"],
});

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { bookPayloadSchema } from '~/schemas/bookSchema';

const { handleSubmit, errors, values } = useForm({
  validationSchema: toTypedSchema(bookPayloadSchema),
});

const onSubmit = handleSubmit(async (data) => {
  try {
    await $fetch('/api/books', {
      method: 'POST',
      body: data,
    });

    // Feedback success
  } catch (error) {
    // Handle error response
  }
});
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center space-y-4">
    <h1 class="text-3xl font-bold">Add book</h1>
    <NuxtLink to="/admin">Back</NuxtLink>
    <div class="flex flex-col items-start">
      <form @submit.prevent="onSubmit">
        <!-- Input fields + errors.title dsb. -->
        <div action="" class="mb-3">
          <label for="">Title</label>
          <input type="text" class="" />
        </div>
        <div action="" class="mb-3">
          <label for="">Author</label>
          <input type="text" class="" />
        </div>
        <div action="" class="mb-3">
          <label for="">ISBN</label>
          <input type="text" class="" />
        </div>
        <div action="" class="mb-3">
          <label for="">Cover</label>
          <input type="text" class="" />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  </div>
</template>
