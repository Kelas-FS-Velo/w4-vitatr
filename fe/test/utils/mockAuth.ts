import { vi } from "vitest";
import { ref, computed } from "vue";

// ✅ Mocks
export const mockUser = ref<any>(null);
export const mockLogin = vi.fn();
export const mockRegister = vi.fn();
export const mockLogout = vi.fn();
export const mockFetchUser = vi.fn();
export const mockRefreshUser = vi.fn();
export const mockNavigateTo = vi.fn();
export const mockErrors = ref({});
export const mockSetErrors = vi.fn();

// 🌍 Global mock for navigateTo
vi.stubGlobal("navigateTo", mockNavigateTo);

// ✅ Mock the real package that is used in stores/auth.ts
vi.mock("@qirolab/nuxt-sanctum-authentication", () => {
  return {
    __esModule: true,
    default: vi.fn(() => ({
      user: mockUser,
      isLoggedIn: computed(() => !!mockUser.value),
      login: mockLogin,
      register: mockRegister,
      logout: mockLogout,
      fetchUser: mockFetchUser,
      refreshUser: mockRefreshUser,
    })),
  };
});

// ✅ Optional mock for form errors
vi.mock("~/composables/useFormErrors", () => ({
  useFormErrors: () => ({
    errors: mockErrors,
    setErrors: mockSetErrors,
  }),
}));

// ✅ Mock for useSanctumFetch
export const mockSanctumFetch = vi.fn();

vi.mock("~/composables/useSanctumFetch", () => ({
  useSanctumFetch: mockSanctumFetch,
}));
