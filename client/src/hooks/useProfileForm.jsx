import { useState, useEffect } from "react";

export const useProfileForm = (initialUser) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    position: "",
    avatar: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialUser) {
      setFormData({
        name: initialUser.name || "",
        email: initialUser.email || "",
        phone_number: initialUser.phone_number || "",
        address: initialUser.address || "",
        position: initialUser.position || "",
        avatar: initialUser.avatar || null,
      });
    }
  }, [initialUser]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (
      formData.phone_number &&
      !/^\+?[\d\s-]{8,}$/.test(formData.phone_number)
    ) {
      newErrors.phone_number = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
  };
};
