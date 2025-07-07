import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { IUser, ILoginPayload, IRegisterPayload } from "~/types/auth";
import { useFormErrors } from "~/composables/useFormErrors";

export const useAuthStore = defineStore("auth", () => {
  const { user, logout, refreshUser } = useSanctum<IUser>();
  const isLoggedIn = computed(() => !!user.value);
  const { errors, setErrors } = useFormErrors();

  async function login(payload: ILoginPayload) {
    errors.value = {};

    try {
      await useSanctumFetch("/api/login", {
        method: "POST",
        body: payload,
        credentials: "include",
      });

      await refreshUser();

      if (user.value?.role === "admin") {
        return navigateTo("/admin");
      }

      return navigateTo("/dashboard");
    } catch (e: any) {
      setErrors(e);
      throw e;
    }
  }

  async function register(payload: IRegisterPayload) {
    errors.value = {};

    try {
      await useSanctumFetch("/api/register", {
        method: "POST",
        body: payload,
        credentials: "include",
      });

      await refreshUser();
      return true;
    } catch (e: any) {
      setErrors(e);
      return false;
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    errors,
    register,
    logout,
  };
});
