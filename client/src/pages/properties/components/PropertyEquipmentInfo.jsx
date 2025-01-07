// src/components/properties/sections/PropertyEquipmentInfo.jsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export default function PropertyEquipmentInfo({ form }) {
  const equipmentItems = [
    { name: "bathtub", label: "Bathtub" },
    { name: "shower", label: "Shower" },
    { name: "guest_toilet", label: "Guest Toilet" },
    { name: "alarm_system", label: "Alarm System" },
    { name: "smart_lock", label: "Smart Lock" },
    { name: "air_conditioning", label: "Air Conditioning" },
    { name: "floor_heating", label: "Floor Heating" },
    { name: "elevator", label: "Elevator" },
    { name: "barrier_free", label: "Barrier Free" },
    { name: "furnished", label: "Furnished" },
    { name: "balcony", label: "Balcony" },
    { name: "terrace", label: "Terrace" },
    { name: "garden", label: "Garden" },
    { name: "parking", label: "Parking" },
    { name: "garage", label: "Garage" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {equipmentItems.map((item) => (
        <FormField
          key={item.name}
          control={form.control}
          name={`equipment.${item.name}`}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{item.label}</FormLabel>
              </div>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
