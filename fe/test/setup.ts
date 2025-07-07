import { vi } from "vitest";
import { ref, computed } from "vue"; // ✅ tambahkan computed
import { config } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import type { IUser } from "~/types/auth";

// ✅ Stub global navigateTo agar tidak error saat test
vi.stubGlobal("navigateTo", vi.fn());

// ✅ Stub global untuk useSanctum
vi.stubGlobal("useSanctum", () => {
  const user = ref<IUser | null>({
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    role: "user",
  });

  return {
    user,
    logout: vi.fn(() => {
      user.value = null;
    }),
    refreshUser: vi.fn(() => {
      user.value = {
        id: 1,
        name: "Jane Doe",
        email: "jane@example.com",
        role: "user",
      };
    }),
  };
});

vi.stubGlobal("useSanctumFetch", vi.fn().mockResolvedValue({ status: 200 }));

// ✅ Inject Pinia agar store jalan
config.global.plugins = [createTestingPinia()];
