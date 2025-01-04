// src/features/company-profile/hooks/useCompanyForm.js
import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/api/axios";

export const useCompanyForm = (initialData) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    bio: initialData?.bio || "",
    location: initialData?.location || "",
    social_links: Array.isArray(initialData?.social_links)
      ? initialData.social_links
      : [],
    logo: initialData?.logo || null,
    color_brand_company: initialData?.color_brand_company || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleSocialLinkChange = (index, value) => {
    setFormData((prev) => {
      const newSocialLinks = [...prev.social_links];
      newSocialLinks[index] = value;
      return { ...prev, social_links: newSocialLinks };
    });
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      social_links: [...prev.social_links, ""],
    }));
  };

  const removeSocialLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      social_links: prev.social_links.filter((_, i) => i !== index),
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Company name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const prepareFormData = () => {
    const updateData = new FormData();
    const cleanedSocialLinks = formData.social_links.filter(
      (link) => link.trim() !== ""
    );

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (key === "logo" && !(formData[key] instanceof File)) return;
        if (key === "social_links") {
          updateData.append(
            "social_links[]",
            JSON.stringify(cleanedSocialLinks)
          );
        } else {
          updateData.append(key, formData[key]);
        }
      }
    });

    return updateData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const updateData = prepareFormData();

    try {
      const response = await axiosInstance.post(
        "/company-profile",
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );

      toast.success("Company profile updated successfully");
      return response.data;
    } catch (error) {
      console.error("Update failed:", error.response?.data);
      setErrors(error.response?.data?.errors || {});
      toast.error(
        error.response?.data?.message || "Failed to update company profile"
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleLogoChange,
    handleSocialLinkChange,
    addSocialLink,
    removeSocialLink,
  };
};
