<template>
  <div class="h-screen">
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div>
          <NuxtLink to="/" class="font-bold text-xl">Home</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/auth/login" class="mr-4">Login</NuxtLink>
          <NuxtLink to="/auth/register" class="mr-4">Register</NuxtLink>
          <NuxtLink to="/dashboard" class="mr-4">Dashboard</NuxtLink>
          <NuxtLink to="/logout" class="mr-4">Logout</NuxtLink>
          <span>Welcome, user!</span>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
