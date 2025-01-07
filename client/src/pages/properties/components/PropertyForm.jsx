import { useForm } from "react-hook-form";
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

export function PropertyForm({ property, onSuccess }) {
  const { createProperty, updateProperty, loading } = useProperty();
  const isEditing = !!property;

  const form = useForm({
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
        amount: 0,
        price_per_meter: 0,
        currency: "EUR",
        type: "sale",
        price_on_request: false,
        warm_rent: 0,
        cold_rent: 0,
        heating_costs: 0,
        additional_costs: 0,
        non_transferable_costs: 0,
        parking_price: 0,
        monthly_rental_income: 0,
        heating_in_additional_costs: false,
      },
      area: {
        total_area: 0,
        living_area: 0,
        usable_area: 0,
        land_area: 0,
        storage_area: 0,
        terrace_area: 0,
        balcony_area: 0,
        garden_area: 0,
        basement_area: 0,
        garage_area: 0,
        parking_area: 0,
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
      if (isEditing) {
        await updateProperty(property.id, data);
      } else {
        await createProperty(data);
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);

      form.setError("root", {
        type: "manual",
        message: "Failed to save property. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyBasicInfo form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price Information</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyPriceInfo form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Area Information</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyAreaInfo form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyAdditionalInfo form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyEquipmentInfo form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyAddressInfo form={form} />
          </CardContent>
        </Card>

        {form.formState.errors.root && (
          <div className="text-red-500 text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Update Property" : "Create Property"}
          </Button>
        </div>
      </form>
    </Form>
  );
}