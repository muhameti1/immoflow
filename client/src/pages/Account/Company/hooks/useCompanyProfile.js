import { useState, useEffect } from "react";
import { toast } from "sonner";
import axiosInstance from "@/api/axios";

export const useCompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axiosInstance.get("/company-profile");
        setCompany(response.data);
      } catch (error) {
        toast.error("Failed to fetch company data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompany();
  }, []);

  return { company, isLoading };
};
