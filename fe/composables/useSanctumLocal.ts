// composables/useSanctumLocal.ts
import { ref, computed } from "vue";
import {
  mockUser,
  mockLogin,
  mockRegister,
  mockLogout,
  mockFetchUser,
  mockRefreshUser,
} from "@/test/utils/mockAuth";

export function useSanctum() {
  return {
    user: mockUser,
    isLoggedIn: computed(() => !!mockUser.value),
    login: mockLogin,
    register: mockRegister,
    logout: mockLogout,
    fetchUser: mockFetchUser,
    refreshUser: mockRefreshUser,
  };
}
