import { ref } from "vue";
import type { ZodTypeAny } from "zod";

interface ValidationSuccess<T> {
  success: true;
  data: T;
}

interface ValidationFailure {
  success: false;
  errors: Record<string, string>;
}

type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

export const useZodValidation = () => {
  const errors = ref<Record<string, string>>({});

  function validate<T>(
    schema: ZodTypeAny<T>,
    data: unknown,
  ): ValidationResult<T> {
    errors.value = {};

    const result = schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    const fieldErrors = result.error.flatten().fieldErrors;

    Object.entries(fieldErrors).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        errors.value[key] = value[0] ?? "";
      }
    });

    return {
      success: false,
      errors: errors.value,
    };
  }
  function clearErrors() {
    errors.value = {};
  }
  return {
    errors,
    validate,
    clearErrors,
  };
};
