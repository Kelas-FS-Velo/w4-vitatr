// vitest.config.ts
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
