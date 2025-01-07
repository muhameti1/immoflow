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

          // Ensure numerical fields are parsed
          price: {
            ...propertyData.prices?.[0],
            amount: parseFloat(propertyData.prices?.[0]?.amount || 0),
            price_per_meter: parseFloat(
              propertyData.prices?.[0]?.price_per_meter || 0
            ),
            currency: propertyData.prices?.[0]?.currency || "EUR", // Default to EUR if undefined
            warm_rent: parseFloat(propertyData.prices?.[0]?.warm_rent || 0),
            cold_rent: parseFloat(propertyData.prices?.[0]?.cold_rent || 0),
            heating_costs: parseFloat(
              propertyData.prices?.[0]?.heating_costs || 0
            ),
            additional_costs: parseFloat(
              propertyData.prices?.[0]?.additional_costs || 0
            ),
            non_transferable_costs: parseFloat(
              propertyData.prices?.[0]?.non_transferable_costs || 0
            ),
            parking_price: parseFloat(
              propertyData.prices?.[0]?.parking_price || 0
            ),
            monthly_rental_income: parseFloat(
              propertyData.prices?.[0]?.monthly_rental_income || 0
            ),
          },

          area: {
            ...propertyData.areas,
            total_area: parseFloat(propertyData.areas?.total_area || 0),
            living_area: parseFloat(propertyData.areas?.living_area || 0),
            usable_area: parseFloat(propertyData.areas?.usable_area || 0),
            plot_area: parseFloat(propertyData.areas?.plot_area || 0),
            rooms: parseFloat(propertyData.areas?.rooms || 0),
            bedrooms: parseFloat(propertyData.areas?.bedrooms || 0),
            bathrooms: parseFloat(propertyData.areas?.bathrooms || 0),
            land_area: parseFloat(propertyData.areas?.land_area || 0),
            storage_area: parseFloat(propertyData.areas?.storage_area || 0),
            terrace_area: parseFloat(propertyData.areas?.terrace_area || 0),
            balcony_area: parseFloat(propertyData.areas?.balcony_area || 0),
            garden_area: parseFloat(propertyData.areas?.garden_area || 0),
            basement_area: parseFloat(propertyData.areas?.basement_area || 0),
            garage_area: parseFloat(propertyData.areas?.garage_area || 0),
            parking_area: parseFloat(propertyData.areas?.parking_area || 0),
          },

          additional: {
            ...propertyData.additional_information,
            year_built: parseInt(
              propertyData.additional_information?.year_built || 0,
              10
            ),
            last_renovation_year: parseInt(
              propertyData.additional_information?.last_renovation_year || 0,
              10
            ),
            number_of_floors: parseInt(
              propertyData.additional_information?.number_of_floors || 0,
              10
            ),
            parking_spaces: parseInt(
              propertyData.additional_information?.parking_spaces || 0,
              10
            ),
          },

          equipment: {
            ...propertyData.equipment,
            bathtub: Boolean(propertyData.equipment?.bathtub),
            shower: Boolean(propertyData.equipment?.shower),
            guest_toilet: Boolean(propertyData.equipment?.guest_toilet),
            kitchen: Boolean(propertyData.equipment?.kitchen),
          },

          address: {
            ...propertyData.address,
            street: propertyData.address?.street || "",
            street_number: propertyData.address?.street_number || "",
            zip_code: propertyData.address?.zip_code || "",
            city: propertyData.address?.city || "",
            state: propertyData.address?.state || "",
            country: propertyData.address?.country || "",
            latitude: parseFloat(propertyData.areas?.latitude || 0),
            longitude: parseFloat(propertyData.areas?.longitude || 0),
          },

          company_id: propertyData.company_id || null,
          created_at: propertyData.created_at,
          updated_at: propertyData.updated_at,
          deleted_at: propertyData.deleted_at || null,
        };

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
      console.log("Submitting data:", data); // Debug log
      const response = await axiosInstance.patch(`/properties/${id}`, data);
      console.log("Update response:", response); // Debug log
      toast.success("Property updated successfully");
      navigate("/app/properties");
    } catch (error) {
      console.error("Error updating property:", error);
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
            // onSubmit={handleSubmit}
            onSuccess={() => navigate("/app/properties")}
          />
        )}
      </div>
    </AdminLayout>
  );
}
