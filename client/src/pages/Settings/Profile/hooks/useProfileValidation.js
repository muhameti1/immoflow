import { useState } from "react";
import { profileSchema } from "../schemas/profileSchema";

export function useProfileValidation() {
  const [errors, setErrors] = useState({});

  const validateForm = (data) => {
    try {
      profileSchema.parse(data);
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
