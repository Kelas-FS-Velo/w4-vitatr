import { describe, test, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "~/stores/auth";

describe("Auth Store", () => {
  let store: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAuthStore();
  });

  test("login success and user is set", async () => {
    await store.login({
      email: "jane@example.com",
      password: "123456",
    });

    expect(store.user?.name).toBe("Jane Doe");
    expect(store.user?.email).toBe("jane@example.com");
    expect(store.isLoggedIn).toBe(true);
  });

  test("register success and user is set", async () => {
    const success = await store.register({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "123456",
      password_confirmation: "123456",
    });

    expect(success).toBe(true);
    expect(store.user?.email).toBe("jane@example.com");
  });
});
