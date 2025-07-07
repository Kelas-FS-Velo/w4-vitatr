import { ref } from "vue";
import type { Ref } from "vue";
import type { IUser } from "@/types/auth";

const mockUser: Ref<IUser | null> = ref(null);
const mockRefreshUser = vi.fn();
const mockLogout = vi.fn();
const mockSetErrors = vi.fn();

vi.stubGlobal("navigateTo", vi.fn());

vi.mock("@/composables/useSanctum", () => ({
  useSanctum: () => ({
    user: mockUser,
    refreshUser: mockRefreshUser,
    logout: mockLogout,
  }),
}));

vi.mock("@/composables/useFormErrors", () => ({
  useFormErrors: () => ({
    errors: ref({}),
    setErrors: mockSetErrors,
  }),
}));

const mockSanctumFetch = vi.fn();
vi.mock("@/composables/useSanctumFetch", () => ({
  useSanctumFetch: mockSanctumFetch,
}));

export {
  mockUser,
  mockRefreshUser,
  mockLogout,
  mockSetErrors,
  mockSanctumFetch,
};
