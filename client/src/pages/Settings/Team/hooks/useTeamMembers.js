// src/pages/TeamManagement/hooks/useTeamMembers.js
import { useState, useEffect } from "react";
import axiosInstance from "@/api/axios";
import { toast } from "sonner";

export function useTeamMembers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/company/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch team members");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
}
