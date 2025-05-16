<script setup lang="ts">
definePageMeta({
  middleware: ["$guest"],
});

import { useAuthStore } from "~/stores/auth";
const auth = useAuthStore();

const form = ref({
  email: "",
  password: "",
});

const error = ref<string | null>(null);

const submitForm = async () => {
  error.value = null;
  try {
    // Wajib: Panggil endpoint CSRF dulu
    await $fetch("/sanctum/csrf-cookie", { credentials: "include" });

    // Panggil login dari store (yang pakai useSanctum)
    await auth.login(form.value);

    // Redirect kalau berhasil
    await navigateTo("/dashboard");
  } catch (err: any) {
    error.value = "Login gagal. Periksa email/password.";
    console.error(err);
  }
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-400"
  >
    <div class="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <form @submit.prevent="submitForm">
        <div class="flex flex-col mt-3 space-y-1">
          <label for="email" class="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div class="flex flex-col mt-3 space-y-1">
          <label for="password" class="text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-500"
        >
          Login
        </button>
        <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
