import { useState } from "react";
import { usePasswordValidation } from "./usePasswordValidation";
import axiosInstance from "@/api/axios";
import { toast } from "sonner";

export function usePasswordForm(user) {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { errors, setErrors, validateForm } = usePasswordValidation();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not found");
      return;
    }

    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.put(`/users/${user.id}/password`, formData);
      toast.success("Password updated successfully");
      setFormData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
      setErrors(error.response?.data?.errors || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
