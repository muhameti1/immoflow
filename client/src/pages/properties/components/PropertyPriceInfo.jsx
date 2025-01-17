import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";

export function PropertyPriceInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="price.amount">Amount</Label>
        <Input
          id="price.amount"
          type="number"
          {...register("price.amount", { required: "Amount is required" })}
        />
        {errors.price?.amount && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.amount.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="price.price_per_meter">Price per Meter</Label>
        <Input
          id="price.price_per_meter"
          type="number"
          {...register("price.price_per_meter")}
        />
        {errors.price?.price_per_meter && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.price_per_meter.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="price.currency">Currency</Label>
        <Input
          id="price.currency"
          type="text"
          {...register("price.currency", { required: "Currency is required" })}
        />
        {errors.price?.currency && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.currency.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="price.type">Type</Label>
        <Controller
          name="price.type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">Sale</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.price?.type && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.type.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="price.warm_rent">Warm Rent</Label>
        <Input
          id="price.warm_rent"
          type="number"
          {...register("price.warm_rent")}
        />
        {errors.price?.warm_rent && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.warm_rent.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="price.cold_rent">Cold Rent</Label>
        <Input
          id="price.cold_rent"
          type="number"
          {...register("price.cold_rent")}
        />
        {errors.price?.cold_rent && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.cold_rent.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="price.heating_costs">Heating Costs</Label>
        <Input
          id="price.heating_costs"
          type="number"
          {...register("price.heating_costs")}
        />
        {errors.price?.heating_costs && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.heating_costs.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="price.additional_costs">Additional Costs</Label>
        <Input
          id="price.additional_costs"
          type="number"
          {...register("price.additional_costs")}
        />
        {errors.price?.additional_costs && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.additional_costs.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="price.non_transferable_costs">
          Non-transferable Costs
        </Label>
        <Input
          id="price.non_transferable_costs"
          type="number"
          {...register("price.non_transferable_costs")}
        />
        {errors.price?.non_transferable_costs && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.non_transferable_costs.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="price.parking_price">Parking Price</Label>
        <Input
          id="price.parking_price"
          type="number"
          {...register("price.parking_price")}
        />
        {errors.price?.parking_price && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.parking_price.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="price.monthly_rental_income">
          Monthly Rental Income
        </Label>
        <Input
          id="price.monthly_rental_income"
          type="number"
          {...register("price.monthly_rental_income")}
        />
        {errors.price?.monthly_rental_income && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.monthly_rental_income.message}
          </p>
        )}
      </div>

      <div className="col-span-full">
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Controller
            name="price.price_on_request"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                id="price.price_on_request"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label
            htmlFor="price.price_on_request"
            className="space-y-1 leading-none"
          >
            Price on request
          </Label>
        </div>
      </div>

      <div className="col-span-full">
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <Controller
            name="price.heating_in_additional_costs"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                id="price.heating_in_additional_costs"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label
            htmlFor="price.heating_in_additional_costs"
            className="space-y-1 leading-none"
          >
            Heating in Additional Costs
          </Label>
        </div>
      </div>
    </div>
  );
}
