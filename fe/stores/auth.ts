import { defineStore } from "pinia";
// import { useSanctum } from "@qirolab/nuxt-sanctum-authentication";

interface IUser {
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<IUser | null>(null);
  const isLoggedIn = computed(() => user.value !== null);

  async function login(credentials: any) {
    await $fetch("http://api.myapp.test/sanctum/csrf-cookie", {
      credentials: "include",
    });

    await $fetch("/login", {
      method: "POST",
      body: credentials,
      credentials: "include",
    });

    await fetchUser();
  }

  async function logout() {
    await $fetch("/logout", {
      method: "POST",
      credentials: "include",
    });
    user.value = null;
  }

  async function fetchUser() {
    try {
      const data = await $fetch<IUser>("/api/user", {
        credentials: "include",
      });
      user.value = data;
    } catch {
      user.value = null;
    }
  }

  return { user, isLoggedIn, login, logout, fetchUser };
});
