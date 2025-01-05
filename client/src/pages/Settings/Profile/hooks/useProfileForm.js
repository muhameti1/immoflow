import { useState, useEffect } from "react";
import { toast } from "sonner";
import axiosInstance from "@/api/axios";

export function useProfileForm(user) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    address: user?.address || "",
    position: user?.position || "",
    avatar: user?.avatar || null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
        position: user.position || "",
        avatar: user.avatar || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting form data:", formData);

    const updateData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (key === "avatar" && formData[key] instanceof File) {
          updateData.append("avatar", formData[key]);
        } else if (key !== "avatar") {
          updateData.append(key, formData[key]);
        }
      }
    });

    try {
      const response = await axiosInstance.post(
        `/users/${user.id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );

      console.log("API Response:", response.data);
      toast.success("Profile updated successfully");

      setFormData((prev) => ({
        ...prev,
        ...response.data.user,
      }));
    } catch (error) {
      console.error("Update failed:", error.response?.data);
      setErrors(error.response?.data?.errors || {});
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
