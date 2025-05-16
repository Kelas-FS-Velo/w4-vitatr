<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import type Button from "~/components/ui/button/Button.vue";

const auth = useAuthStore();
const { isLoggedIn, user } = storeToRefs(useAuthStore()); // ✅ reactive

function logoutUser() {
  auth.logout();
  navigateTo("/"); // redirect ke homepage
}
</script>

<template>
  <div class="h-screen">
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div>
          <NuxtLink to="/" class="font-bold text-xl">Home</NuxtLink>
        </div>
        <div>
          <template v-if="!isLoggedIn">
            <NuxtLink to="/auth/login" class="mr-4">Login</NuxtLink>
            <NuxtLink to="/auth/register" class="mr-4">Register</NuxtLink>
          </template>
          <template v-if="isLoggedIn">
            <NuxtLink to="/dashboard" class="mr-4">Dashboard</NuxtLink>
            <Button @click.prevent="logoutUser" class="mr-4">Logout</Button>
            <span>Welcome, {{ user?.name }}!</span>
          </template>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
