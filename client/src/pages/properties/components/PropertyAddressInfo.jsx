import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";

export default function PropertyAddressInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="address.street" className="">
          Street
        </Label>
        <Input
          id="address.street"
          type="text"
          {...register("address.street")}
        />
        {errors.address?.street && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.street.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="address.street_number" className="">
          Street Number
        </Label>
        <Input
          id="address.street_number"
          type="text"
          {...register("address.street_number")}
        />
        {errors.address?.street_number && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.street_number.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="address.zip_code" className="">
          Zip Code
        </Label>
        <Input
          id="address.zip_code"
          type="text"
          {...register("address.zip_code")}
        />
        {errors.address?.zip_code && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.zip_code.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="address.city" className="">
          City
        </Label>
        <Input id="address.city" type="text" {...register("address.city")} />
        {errors.address?.city && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.city.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="address.state" className="">
          State
        </Label>
        <Input id="address.state" type="text" {...register("address.state")} />
        {errors.address?.state && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.state.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="address.country" className="">
          Country
        </Label>
        <Input
          id="address.country"
          type="text"
          {...register("address.country")}
        />
        {errors.address?.country && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.country.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="address.region" className="">
          Region
        </Label>
        <Input
          id="address.region"
          type="text"
          {...register("address.region")}
        />
        {errors.address?.region && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.region.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="address.latitude" className="">
          Latitude
        </Label>
        <Input
          id="address.latitude"
          type="number"
          step="any"
          {...register("address.latitude")}
        />
        {errors.address?.latitude && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.latitude.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="address.longitude" className="">
          Longitude
        </Label>
        <Input
          id="address.longitude"
          type="number"
          step="any"
          {...register("address.longitude")}
        />
        {errors.address?.longitude && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.longitude.message}
          </p>
        )}
      </div>

      <div className="col-span-full">
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Controller
            name="address.hide_exact_location"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                id="address.hide_exact_location"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label
            htmlFor="address.hide_exact_location"
            className="space-y-1 leading-none"
          >
            Hide Exact Location
          </Label>
        </div>
      </div>

      <div className="col-span-full">
        <Label htmlFor="address.directions" className="">
          Directions
        </Label>
        <Textarea id="address.directions" {...register("address.directions")} />
        {errors.address?.directions && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.directions.message}
          </p>
        )}
      </div>
    </div>
  );
}
