import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PropertyForm } from "./components/PropertyForm";
import axiosInstance from "@/api/axios";
import AdminLayout from "@/layouts/AdminLayout";

export default function CreateProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosInstance.get(`/properties/${id}`);
        setProperty(response.data.property);
      } catch (error) {
        toast.error("Failed to fetch property");
        navigate("/app/properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await axiosInstance.post(`/properties`, data);
      toast.success("Property created successfully");
      navigate("/app/properties");
    } catch (error) {
      toast.error("Failed to create property");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
        <PropertyForm onSubmit={handleSubmit} isEditing={false} />
      </div>
    </AdminLayout>
  );
}
