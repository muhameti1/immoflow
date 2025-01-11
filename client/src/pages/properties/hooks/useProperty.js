import { useState } from "react";
import axiosInstance from "@/api/axios";
import { toast } from "sonner";

export const useProperty = () => {
  const [loading, setLoading] = useState(false);

  const createProperty = async (data) => {
    setLoading(true);
    try {
      console.log("Creating property with data:", data);
      const response = await axiosInstance.post("/properties", data);
      toast.success("Property created successfully");
      return response.data;
    } catch (error) {
      console.error("Create Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to create property");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProperty = async (id, data) => {
    setLoading(true);
    try {
      console.log("Updating property with id:", id);
      console.log("Update data:", data);

      const response = await axiosInstance.put(`/properties/${id}`, data);

      console.log("Update response:", response.data);
      toast.success("Property updated successfully");
      return response.data;
    } catch (error) {
      console.error("Update Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || "Failed to update property");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createProperty,
    updateProperty,
  };
};
