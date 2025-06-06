import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import type {
  IUser,
  ILoginPayload,
  IRegisterPayload,
  IValidationError,
} from "~/types/auth";
import { useFormErrors } from "~/composables/useFormErrors";

export const useAuthStore = defineStore("auth", () => {
  const { user, logout, refreshUser } = useSanctum<IUser>();
  const isLoggedIn = computed(() => !!user.value);
  const { errors, setErrors } = useFormErrors();

  async function login(payload: ILoginPayload) {
    errors.value = {};

    try {
      console.log("Login payload:", payload);
      await useSanctumFetch("/api/login", {
        method: "POST",
        body: payload,
        credentials: "include",
      });

      await refreshUser();

      // ✅ Redirect setelah login berdasarkan role
      if (user.value?.role === "admin") {
        return navigateTo("/admin");
      }

      return navigateTo("/dashboard");
    } catch (e: any) {
      if (e instanceof FetchError && e.response?.status === 422) {
        errors.value = e.response._data.errors;
      } else {
        console.error("Unexpected error:", e);
      }
      throw e; // lempar ke pemanggil supaya bisa ditangani
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
