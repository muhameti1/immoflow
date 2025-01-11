import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/api/axios";
import AdminLayout from "@/layouts/AdminLayout";
import { PropertyForm } from "./components/PropertyForm";

export default function CreateProperty() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await axiosInstance.post(`/properties`, data);
      toast.success("Property created successfully");
      navigate("/app/properties");
    } catch (error) {
      toast.error("Failed to create property");
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Create Property</h1>
        <PropertyForm onSubmit={handleSubmit} isEditing={false} />
      </div>
    </AdminLayout>
  );
}
