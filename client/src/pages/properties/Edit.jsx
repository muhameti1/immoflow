import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PropertyForm } from "./components/PropertyForm";
import axiosInstance from "@/api/axios";
import AdminLayout from "@/layouts/AdminLayout";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosInstance.get(`/properties/${id}`);
        const propertyData = response.data;

        const transformedData = {
          id: propertyData.id,
          title: propertyData.title,
          description: propertyData.description,
          status: propertyData.status,
          category: propertyData.category,
          object_type: propertyData.object_type,
          warnings: propertyData.warnings,
          features: propertyData.features,
          order_number: propertyData.order_number,
          unit_number: propertyData.unit_number,
          internal_note: propertyData.internal_note,

          // Use objects directly without assuming arrays
          price: propertyData.prices?.[0] || {}, // Prices seem to be an array
          area: propertyData.areas || {}, // Areas is an object
          additional: propertyData.additional_information || {}, // Additional Information is an object
          equipment: propertyData.equipment || {}, // Equipment is an object
          address: propertyData.address || {}, // Address is an object
        };

        console.log("Property Data:", propertyData);
        console.log("Transformed Data:", transformedData);

        setProperty(transformedData);
      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("Failed to fetch property");
        navigate("/app/properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      await axiosInstance.patch(`/properties/${id}`, data);
      toast.success("Property updated successfully");
      navigate("/app/properties");
    } catch (error) {
      console.error("Error updating property:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update property");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
        {property && (
          <PropertyForm
            property={property}
            onSuccess={() => navigate("/app/properties")}
          />
        )}
      </div>
    </AdminLayout>
  );
}
