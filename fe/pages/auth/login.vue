<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: ["$guest"],
});

useHead({
  title: "ReadAIbit | Login",
});

const form = ref({
  email: "",
  password: "",
});

const auth = useAuthStore();
const error = ref<string | null>(null);

const submitForm = async () => {
  error.value = null;

  try {
    await auth.login(form.value);
    // redirect akan terjadi di dalam store ketika login sukses
  } catch (err) {
    error.value = "Login gagal. Periksa email/password.";
    console.error("Login error:", err);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div
      class="w-full max-w-md p-8 space-y-3 bg-secondary shadow-lg rounded-lg"
    >
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <form @submit.prevent="submitForm">
        <div class="flex flex-col mt-3 space-y-1">
          <label for="email" class="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            class="w-full px-3 py-2 border border-secondary rounded-md focus:outline-none"
          />
        </div>
        <div class="flex flex-col mt-3 space-y-1">
          <label for="password" class="text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            class="w-full px-3 py-2 border border-secondary rounded-md focus:outline-none"
          />
        </div>
        <Button
          type="submit"
          class="mt-8 w-full px-4 py-2 text-sm font-medium text-secondary"
        >
          Login
        </Button>
        <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
