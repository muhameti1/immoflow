// src/components/properties/PropertyForm.jsx
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyBasicInfo } from "./PropertyBasicInfo";
// import { PropertyPriceInfo } from "./PropertyPriceInfo";
// import { PropertyAreaInfo } from "./PropertyAreaInfo";
import { useProperty } from "../hooks/useProperty";
import { propertySchema } from "../schema/propertySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PropertyPriceInfo } from "./PropertyPriceInfo";
import { PropertyAreaInfo } from "./PropertyAreaInfo";
import PropertyAdditionalInfo from "./PropertyAdditionalInfo";
import PropertyEquipmentInfo from "./PropertyEquipmentInfo";
import PropertyAddressInfo from "./PropertyAddressInfo";
import AdminLayout from "@/layouts/AdminLayout";

export function PropertyForm({ property, onSuccess }) {
  const { createProperty, updateProperty, loading } = useProperty();
  const isEditing = !!property;

  const form = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: property || {
      title: "",
      description: "",
      status: "draft",
      price: {
        amount: 0,
        currency: "EUR",
        type: "sale",
      },
      // Add other default values
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
    }
  };

  return (
    <AdminLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Card>
                <CardHeader>Basic Info</CardHeader>
                <CardContent>
                  <PropertyBasicInfo form={form} />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>Price Info</CardHeader>
                <CardContent>
                  <PropertyPriceInfo form={form} />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>Area Info</CardHeader>
                <CardContent>
                  <PropertyAreaInfo form={form} />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>Additional Info</CardHeader>
                <CardContent>
                  <PropertyAdditionalInfo form={form} />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>Equipments</CardHeader>
                <CardContent>
                  <PropertyEquipmentInfo form={form} />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>Address</CardHeader>
                <CardContent>
                  <PropertyAddressInfo form={form} />
                </CardContent>
              </Card>
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Property"
              : "Create Property"}
          </Button>
        </form>
      </Form>
    </AdminLayout>
  );
}
