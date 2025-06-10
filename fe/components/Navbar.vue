<script setup lang="ts">
const auth = useAuthStore();

function logoutUser() {
  auth.logout().then(() => {
    navigateTo("/");
  });
}

const mode = useColorMode();
const toggleTheme = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <nav class="sticky top-0 z-50 backdrop-blur-sm bg-secondary/30 py-4 px-6">
    <div class="w-full mx-auto flex items-center justify-between">
      <!-- Left: Logo -->
      <NuxtLink to="/" class="font-bold text-xl mr-6">Home</NuxtLink>

      <!-- Center: Menu links (only if not logged in) -->
      <div v-if="!auth.isLoggedIn" class="flex gap-6 items-center">
        <NuxtLink to="/dashboard" class="hover:underline">Books</NuxtLink>
        <NuxtLink to="/about-us" class="hover:underline">About Us</NuxtLink>
      </div>

      <!-- Right: Auth buttons -->
      <div class="flex items-center gap-4">
        <!-- dark mode -->
        <!-- <ColorMode /> -->
        <button
          @click="toggleTheme"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background"
        >
          <Icon name="heroicons:sun" class="h-5 w-5" />
        </button>

        <template v-if="!auth.isLoggedIn">
          <NuxtLink to="/auth/login" class="hover:underline">Login</NuxtLink>
          <NuxtLink to="/auth/register" class="hover:underline"
            >Register</NuxtLink
          >
        </template>
        <template v-else>
          <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
          <Button @click.prevent="logoutUser">Logout</Button>
          <div class="inline-flex gap-1 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span class="">{{ auth.user?.name }}!</span>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>
