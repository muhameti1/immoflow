// src/pages/Profile/hooks/usePasswordValidation.ts
import { useState } from "react";
import { passwordSchema } from "../schemas/passwordSchema";

export function usePasswordValidation() {
  const [errors, setErrors] = useState({});

  const validateForm = (data) => {
    try {
      passwordSchema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error.errors) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  return { errors, setErrors, validateForm };
}
