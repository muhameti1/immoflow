// src/hooks/useProperty.js
import axiosInstance from "@/api/axios";
import { useState } from "react";
import { toast } from "sonner";

export const useProperty = () => {
  const [loading, setLoading] = useState(false);

  const createProperty = async (propertyData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/properties", propertyData);
      toast.success("Property created successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create property");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProperty = async (id, propertyData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/properties/${id}`,
        propertyData
      );
      toast.success("Property updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update property");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/properties/${id}`);
      toast.success("Property deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete property");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createProperty,
    updateProperty,
    deleteProperty,
  };
};
