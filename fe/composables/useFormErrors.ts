import type { IValidationError } from "~/types/auth";

export function useFormErrors() {
  const errors = ref<IValidationError>({});

  function setErrors(e: any) {
    if (e?.response?.status === 422) {
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
