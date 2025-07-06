import { vi } from "vitest";

/**
 * Create a mock for Nuxt 3's $fetch with optional resolved or rejected response.
 */
export function mockNuxtFetch({
  response,
  reject = false,
  log = false,
}: {
  response: any;
  reject?: boolean;
  log?: boolean;
}) {
  const fetchMock = reject
    ? vi.fn().mockRejectedValue(response)
    : vi.fn().mockResolvedValue(response);

  // Create a full mock object that mimics $fetch
  const mocked$fetch = Object.assign(fetchMock, {
    raw: vi.fn(),
    create: vi.fn(),
  });

  // Assign to global, cast loosely
  global.$fetch = mocked$fetch as any;
  if (log) console.log("✅ $fetch mocked:", mocked$fetch);
  return mocked$fetch;
}
