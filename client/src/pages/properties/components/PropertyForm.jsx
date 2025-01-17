import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useProperty } from "../hooks/useProperty";
import { PropertyBasicInfo } from "./PropertyBasicInfo";
import { PropertyPriceInfo } from "./PropertyPriceInfo";
import { PropertyAreaInfo } from "./PropertyAreaInfo";
import PropertyAdditionalInfo from "./PropertyAdditionalInfo";
import PropertyEquipmentInfo from "./PropertyEquipmentInfo";
import PropertyAddressInfo from "./PropertyAddressInfo";
import { propertySchema } from "../schema/propertySchema";
import { toast } from "sonner";
import { useEffect } from "react";

export function PropertyForm({ property, onSuccess }) {
  const { createProperty, updateProperty, loading } = useProperty();
  const isEditing = !!property;

  const methods = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: property || {
      title: "",
      description: "",
      status: "draft",
      category: "",
      object_type: "",
      warnings: "",
      features: "",
      order_number: "",
      unit_number: "",
      internal_note: "",
      price: {
        amount: null,
        price_per_meter: null,
        currency: "EUR",
        type: "sale",
        price_on_request: false,
        warm_rent: null,
        cold_rent: null,
        heating_costs: null,
        additional_costs: null,
        non_transferable_costs: null,
        parking_price: null,
        monthly_rental_income: null,
        heating_in_additional_costs: false,
      },
      area: {
        total_area: null,
        living_area: null,
        usable_area: null,
        land_area: null,
        storage_area: null,
        terrace_area: null,
        balcony_area: null,
        garden_area: null,
        basement_area: null,
        garage_area: null,
        parking_area: null,
      },
      additional: {
        year_built: null,
        last_renovation_year: null,
        number_of_floors: null,
        floor_number: "",
        number_of_rooms: null,
        number_of_bathrooms: null,
        parking_spaces: null,
        energy_rating: "",
        heating_type: "",
        construction_type: "",
        building_condition: "",
        last_modernization: "",
        interior_quality: "",
      },
      equipment: {
        bathtub: false,
        shower: false,
        guest_toilet: false,
        alarm_system: false,
        smart_lock: false,
        air_conditioning: false,
        floor_heating: false,
        elevator: false,
        barrier_free: false,
        furnished: false,
        balcony: false,
        terrace: false,
        garden: false,
        parking: false,
        garage: false,
      },
      address: {
        street: "",
        street_number: "",
        zip_code: "",
        city: "",
        state: "",
        country: "",
        region: "",
        latitude: null,
        longitude: null,
        hide_exact_location: false,
        directions: "",
      },
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data); // Debug log
      if (isEditing) {
        await updateProperty(property.id, data);
      } else {
        await createProperty(data);
      }
      toast.success(
        isEditing
          ? "Property updated successfully"
          : "Property created successfully"
      );
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || "Failed to save property");
    }
  };

  useEffect(() => {
    if (property) {
      console.log("Setting form values:", property); // Debug log
      methods.reset(property);
    }
  }, [property, methods]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-4"
      >
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyBasicInfo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price Information</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyPriceInfo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Area Information</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyAreaInfo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyAdditionalInfo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyEquipmentInfo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyAddressInfo />
          </CardContent>
        </Card>

        {methods.formState.errors.root && (
          <div className="text-red-500 text-sm">
            {methods.formState.errors.root.message}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={methods.formState.isSubmitting}
            onClick={() => {
              console.log("Current form values:", methods.getValues()); // Debug log
            }}
          >
            {methods.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isEditing ? "Update Property" : "Create Property"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
