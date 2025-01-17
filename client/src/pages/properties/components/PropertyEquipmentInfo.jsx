import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFormContext, Controller } from "react-hook-form";

export default function PropertyEquipmentInfo() {
  const { control } = useFormContext();

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
        <div
          key={item.name}
          className="flex flex-row items-start space-x-3 space-y-0"
        >
          <Controller
            name={`equipment.${item.name}`}
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                id={item.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Label htmlFor={item.name} className="space-y-1 leading-none">
            {item.label}
          </Label>
        </div>
      ))}
    </div>
  );
}
