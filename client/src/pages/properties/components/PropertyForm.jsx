import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { propertySchema } from "../schema/propertySchema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PropertyBasicInfo } from "./PropertyBasicInfo";
import { PropertyPriceInfo } from "./PropertyPriceInfo";
import { PropertyAreaInfo } from "./PropertyAreaInfo";
import PropertyEquipmentInfo from "./PropertyEquipmentInfo";
import PropertyAddressInfo from "./PropertyAddressInfo";
import PropertyAdditionalInfo from "./PropertyAdditionalInfo";

export function PropertyForm({
  property,
  onSubmit: submitHandler,
  isEditing = false,
}) {
  const form = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: property || {
      title: "",
      description: "",
      status: "",
      category: "",
      object_type: "",
      warnings: "",
      features: "",
      order_number: "",
      unit_number: "",
      internal_note: "",
      price: {},
      area: {},
      additional: {},
      equipment: {},
      address: {},
    },
  });

  const handleSubmit = async (data) => {
    console.log("Submitting form data:", data);
    try {
      await submitHandler(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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

        <Button type="submit" className="mt-6">
          {isEditing ? "Update Property" : "Create Property"}
        </Button>
      </form>
    </Form>
  );
}
