// src/hooks/useProperty.js
import { useState } from "react";
import axiosInstance from "@/api/axios";
import { toast } from "sonner";

export function useProperty() {
  const [loading, setLoading] = useState(false);

  const createProperty = async (data) => {
    setLoading(true);
    try {
      // Replace with your API call
      const response = await axiosInstance.post("/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create property");
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: "Property created successfully",
      });
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create property",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProperty = async (id, data) => {
    setLoading(true);
    try {
      // Replace with your API call
      const response = await axiosInstance.put(`/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update property");
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: "Property updated successfully",
      });
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getProperty = async (id) => {
    setLoading(true);
    try {
      // Replace with your API call
      const response = await axiosInstance.get(`/properties/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch property");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch property",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createProperty,
    updateProperty,
    getProperty,
  };
}
