import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useSanctum } from "#imports"; // penting agar tersambung dengan nuxt-sanctum

interface IUser {
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", () => {
  const sanctum = useSanctum<IUser>();

  const user = ref<IUser | null>(null);
  const isLoggedIn = computed(() => user.value !== null);

  // LOGIN
  async function login(credentials: Record<string, any>) {
    await sanctum.login(credentials, {}, (response, loggedInUser) => {
      user.value = loggedInUser;
    });
  }

  // LOGOUT
  async function logout() {
    await sanctum.logout();
    user.value = null;
  }

  // FETCH USER
  async function fetchUser() {
    await sanctum.refreshUser();
    user.value = sanctum.user.value; // ⬅️ ambil dari composable langsung
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    fetchUser,
  };
});
