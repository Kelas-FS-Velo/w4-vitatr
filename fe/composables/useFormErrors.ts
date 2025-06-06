import type { IValidationError } from "~/types/auth";
import { FetchError } from "ofetch";

export function useFormErrors() {
  const errors = ref<IValidationError>({});

  function setErrors(e: unknown) {
    if (e instanceof FetchError && e.response?.status === 422) {
      errors.value = e.response._data.errors;
    } else {
      console.error("Unexpected error:", e);
    }
  }

  return {
    errors,
    setErrors,
  };
}
