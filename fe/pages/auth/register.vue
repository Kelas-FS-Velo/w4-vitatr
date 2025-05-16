<script setup lang="ts">
import { FetchError } from "ofetch";
import Button from "~/components/ui/button/Button.vue";
// import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: ["$guest"],
});

// const auth = useAuthStore();

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

interface ValidationError {
  [key: string]: string[];
}
const errors = ref<ValidationError>({});
const { refreshUser } = useSanctum();
async function registerUser() {
  errors.value = {};

  try {
    // ⛔️ Tidak perlu fetch csrf-cookie, sudah otomatis

    // ✅ Register user ke Laravel Fortify
    await useSanctumFetch("/api/register", {
      method: "POST",
      body: form.value,
      credentials: "include", // penting agar cookie dikirim
    });

    // ✅ Ambil user setelah register sukses
    // await auth.fetchUser();

    await refreshUser();

    // ✅ Redirect
    return navigateTo("/dashboard");
  } catch (e: any) {
    if (e instanceof FetchError && e.response?.status === 422) {
      errors.value = e.response._data.errors;
    } else {
      console.error("Unexpected error:", e);
    }
  }
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-400"
  >
    <div class="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-center">Register</h1>
      <form @submit.prevent="registerUser">
        <div class="flex flex-col space-y-1">
          <label for="name" class="text-sm font-medium">Name</label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <span class="text-red-600 text-sm" v-if="errors.name">{{
            errors.name[0]
          }}</span>
        </div>

        <div class="flex flex-col mt-3 space-y-1">
          <label for="email" class="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <span class="text-red-600 text-sm" v-if="errors.email">{{
            errors.email[0]
          }}</span>
        </div>

        <div class="flex flex-col mt-3 space-y-1">
          <label for="password" class="text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <span class="text-red-600 text-sm" v-if="errors.password">{{
            errors.password[0]
          }}</span>
        </div>

        <div class="flex flex-col mt-3 space-y-1">
          <label for="password_confirmation" class="text-sm font-medium"
            >Confirm Password</label
          >
          <input
            id="password_confirmation"
            type="password"
            v-model="form.password_confirmation"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <span
            class="text-red-600 text-sm"
            v-if="errors.password_confirmation"
          >
            {{ errors.password_confirmation[0] }}
          </span>
        </div>

        <Button
          type="submit"
          class="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-md"
        >
          Register
        </Button>
      </form>
    </div>
  </div>
</template>
