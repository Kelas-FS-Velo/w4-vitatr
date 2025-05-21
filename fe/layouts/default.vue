<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

function logoutUser() {
  auth.logout().then(() => {
    navigateTo('/')
  })
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
          <template v-if="!auth.isLoggedIn">
            <NuxtLink to="/auth/login" class="mr-4">Login</NuxtLink>
            <NuxtLink to="/auth/register" class="mr-4">Register</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/dashboard" class="mr-4">Dashboard</NuxtLink>
            <Button @click.prevent="logoutUser" class="mr-4">Logout</Button>
            <span>Welcome, {{ auth.user?.name }}!</span>
          </template>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
