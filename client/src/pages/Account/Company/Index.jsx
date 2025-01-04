import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AdminLayout from "@/layouts/AdminLayout";
import axiosInstance from "@/api/axios";
import SettingsLayout from "@/layouts/SettingsLayout";
import { Form } from "@/components/ui/form";
import ContentSection from "@/components/ContectSection";
import { Textarea } from "@/components/ui/textarea";

const CompanyProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [company, setCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    social_links: [],
    logo: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axiosInstance.get("/company-profile");
        setCompany(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          bio: response.data.bio || "",
          location: response.data.location || "",
          social_links: Array.isArray(response.data.social_links)
            ? response.data.social_links
            : [], // Ensure it's an array
          logo: response.data.logo || null,
        });
      } catch (error) {
        toast.error("Failed to fetch company data");
      }
    };
    fetchCompany();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const updateData = new FormData();

    // First, prepare the social_links array by filtering out empty values
    const cleanedSocialLinks = formData.social_links.filter(
      (link) => link.trim() !== ""
    );

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (key === "logo" && !(formData[key] instanceof File)) return;
        if (key === "social_links") {
          // Ensure social_links is properly stringified as a JSON array
          updateData.append(
            "social_links[]",
            JSON.stringify(cleanedSocialLinks)
          );
        } else {
          updateData.append(key, formData[key]);
        }
      }
    });

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

      setCompany(response.data);
      toast.success("Company profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error.response?.data);
      setErrors(error.response?.data?.errors || {});
      toast.error(
        error.response?.data?.message || "Failed to update company profile"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!company) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <SettingsLayout>
        <ContentSection
          title="Company Profile"
          desc="Update your company details"
        />
        <Form>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="name">
                Company Name
                {errors.name && (
                  <span className="text-red-500 text-sm ml-2">
                    {errors.name}
                  </span>
                )}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email
                {errors.email && (
                  <span className="text-red-500 text-sm ml-2">
                    {errors.email}
                  </span>
                )}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="e.g. +1234567890"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="location">Address</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="123 Main St, City, Country"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="logo">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label>Social Links</Label>
              <div className="space-y-4">
                {Array.isArray(formData.social_links) &&
                  formData.social_links.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={link}
                        onChange={(e) =>
                          handleSocialLinkChange(index, e.target.value)
                        }
                        placeholder="https://example.com"
                        disabled={isSubmitting}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeSocialLink(index)}
                        disabled={isSubmitting}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSocialLink}
                  disabled={isSubmitting}
                >
                  Add Social Link
                </Button>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </SettingsLayout>
    </AdminLayout>
  );
};

export default CompanyProfile;
