import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import type { IUser, IRegisterPayload, IValidationError } from "~/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const { user, login, logout, refreshUser } = useSanctum<IUser>();
  const isLoggedIn = computed(() => !!user.value);

  const errors = ref<IValidationError>({});

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
      if (e instanceof FetchError && e.response?.status === 422) {
        errors.value = e.response._data.errors;
      } else {
        console.error("Unexpected error:", e);
      }
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
