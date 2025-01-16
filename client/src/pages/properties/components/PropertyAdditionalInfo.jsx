import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export default function PropertyAdditionalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="additional.year_built">Year Built</Label>
        <Input
          id="additional.year_built"
          type="number"
          {...register("additional.year_built")}
        />
        {errors.additional?.year_built && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.year_built.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.last_renovation_year">
          Last Renovation Year
        </Label>
        <Input
          id="additional.last_renovation_year"
          type="number"
          {...register("additional.last_renovation_year")}
        />
        {errors.additional?.last_renovation_year && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.last_renovation_year.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.number_of_floors">Number of Floors</Label>
        <Input
          id="additional.number_of_floors"
          type="number"
          {...register("additional.number_of_floors")}
        />
        {errors.additional?.number_of_floors && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.number_of_floors.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.floor_number">Floor Number</Label>
        <Input
          id="additional.floor_number"
          type="text"
          {...register("additional.floor_number")}
        />
        {errors.additional?.floor_number && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.floor_number.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.number_of_rooms">Number of Rooms</Label>
        <Input
          id="additional.number_of_rooms"
          type="number"
          {...register("additional.number_of_rooms")}
        />
        {errors.additional?.number_of_rooms && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.number_of_rooms.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.number_of_bathrooms">
          Number of Bathrooms
        </Label>
        <Input
          id="additional.number_of_bathrooms"
          type="number"
          {...register("additional.number_of_bathrooms")}
        />
        {errors.additional?.number_of_bathrooms && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.number_of_bathrooms.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.parking_spaces">Parking Spaces</Label>
        <Input
          id="additional.parking_spaces"
          type="number"
          {...register("additional.parking_spaces")}
        />
        {errors.additional?.parking_spaces && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.parking_spaces.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.energy_rating">Energy Rating</Label>
        <Input
          id="additional.energy_rating"
          type="text"
          {...register("additional.energy_rating")}
        />
        {errors.additional?.energy_rating && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.energy_rating.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.heating_type">Heating Type</Label>
        <Input
          id="additional.heating_type"
          type="text"
          {...register("additional.heating_type")}
        />
        {errors.additional?.heating_type && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.heating_type.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.construction_type">Construction Type</Label>
        <Input
          id="additional.construction_type"
          type="text"
          {...register("additional.construction_type")}
        />
        {errors.additional?.construction_type && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.construction_type.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.building_condition">
          Building Condition
        </Label>
        <Input
          id="additional.building_condition"
          type="text"
          {...register("additional.building_condition")}
        />
        {errors.additional?.building_condition && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.building_condition.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.last_modernization">
          Last Modernization
        </Label>
        <Input
          id="additional.last_modernization"
          type="text"
          {...register("additional.last_modernization")}
        />
        {errors.additional?.last_modernization && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.last_modernization.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="additional.interior_quality">Interior Quality</Label>
        <Input
          id="additional.interior_quality"
          type="text"
          {...register("additional.interior_quality")}
        />
        {errors.additional?.interior_quality && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.interior_quality.message}
          </p>
        )}
      </div>
    </div>
  );
}
