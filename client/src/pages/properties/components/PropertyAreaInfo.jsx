import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export function PropertyAreaInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="area.total_area">Total Area (m²)</Label>
        <Input
          id="area.total_area"
          type="number"
          {...register("area.total_area")}
        />
        {errors.area?.total_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.total_area.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="area.living_area">Living Area (m²)</Label>
        <Input
          id="area.living_area"
          type="number"
          {...register("area.living_area")}
        />
        {errors.area?.living_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.living_area.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="area.usable_area">Usable Area (m²)</Label>
        <Input
          id="area.usable_area"
          type="number"
          {...register("area.usable_area")}
        />
        {errors.area?.usable_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.usable_area.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="area.land_area">Land Area (m²)</Label>
        <Input
          id="area.land_area"
          type="number"
          {...register("area.land_area")}
        />
        {errors.area?.land_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.land_area.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="area.storage_area">Storage Area (m²)</Label>
        <Input
          id="area.storage_area"
          type="number"
          {...register("area.storage_area")}
        />
        {errors.area?.storage_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.storage_area.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="area.terrace_area">Terrace Area (m²)</Label>
        <Input
          id="area.terrace_area"
          type="number"
          {...register("area.terrace_area")}
        />
        {errors.area?.terrace_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.terrace_area.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="area.balcony_area">Balcony Area (m²)</Label>
        <Input
          id="area.balcony_area"
          type="number"
          {...register("area.balcony_area")}
        />
        {errors.area?.balcony_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.balcony_area.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="area.garden_area">Garden Area (m²)</Label>
        <Input
          id="area.garden_area"
          type="number"
          {...register("area.garden_area")}
        />
        {errors.area?.garden_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.garden_area.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="area.basement_area">Basement Area (m²)</Label>
        <Input
          id="area.basement_area"
          type="number"
          {...register("area.basement_area")}
        />
        {errors.area?.basement_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.basement_area.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="area.garage_area">Garage Area (m²)</Label>
        <Input
          id="area.garage_area"
          type="number"
          {...register("area.garage_area")}
        />
        {errors.area?.garage_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.garage_area.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="area.parking_area">Parking Area (m²)</Label>
        <Input
          id="area.parking_area"
          type="number"
          {...register("area.parking_area")}
        />
        {errors.area?.parking_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.parking_area.message}
          </p>
        )}
      </div>
    </div>
  );
}
