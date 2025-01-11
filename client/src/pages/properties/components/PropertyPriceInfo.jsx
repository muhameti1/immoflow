import { useFormContext } from "react-hook-form";

export function PropertyPriceInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="price.amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          id="price.amount"
          type="number"
          {...register("price.amount", { required: "Amount is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price?.amount && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.amount.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price.price_per_meter"
          className="block text-sm font-medium text-gray-700"
        >
          Price per Meter
        </label>
        <input
          id="price.price_per_meter"
          type="number"
          {...register("price.price_per_meter")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price?.price_per_meter && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.price_per_meter.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price.currency"
          className="block text-sm font-medium text-gray-700"
        >
          Currency
        </label>
        <input
          id="price.currency"
          type="text"
          {...register("price.currency", { required: "Currency is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price?.currency && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.currency.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price.type"
          className="block text-sm font-medium text-gray-700"
        >
          Type
        </label>
        <select
          id="price.type"
          {...register("price.type", { required: "Type is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        {errors.price?.type && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.type.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price.warm_rent"
          className="block text-sm font-medium text-gray-700"
        >
          Warm Rent
        </label>
        <input
          id="price.warm_rent"
          type="number"
          {...register("price.warm_rent")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price?.warm_rent && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.warm_rent.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price.cold_rent"
          className="block text-sm font-medium text-gray-700"
        >
          Cold Rent
        </label>
        <input
          id="price.cold_rent"
          type="number"
          {...register("price.cold_rent")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price?.cold_rent && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.cold_rent.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price.heating_costs"
          className="block text-sm font-medium text-gray-700"
        >
          Heating Costs
        </label>
        <input
          id="price.heating_costs"
          type="number"
          {...register("price.heating_costs")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price?.heating_costs && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.heating_costs.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price.additional_costs"
          className="block text-sm font-medium text-gray-700"
        >
          Additional Costs
        </label>
        <input
          id="price.additional_costs"
          type="number"
          {...register("price.additional_costs")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price?.additional_costs && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.additional_costs.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price.non_transferable_costs"
          className="block text-sm font-medium text-gray-700"
        >
          Non-transferable Costs
        </label>
        <input
          id="price.non_transferable_costs"
          type="number"
          {...register("price.non_transferable_costs")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price?.non_transferable_costs && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.non_transferable_costs.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price.parking_price"
          className="block text-sm font-medium text-gray-700"
        >
          Parking Price
        </label>
        <input
          id="price.parking_price"
          type="number"
          {...register("price.parking_price")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price?.parking_price && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.parking_price.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price.monthly_rental_income"
          className="block text-sm font-medium text-gray-700"
        >
          Monthly Rental Income
        </label>
        <input
          id="price.monthly_rental_income"
          type="number"
          {...register("price.monthly_rental_income")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price?.monthly_rental_income && (
          <p className="mt-2 text-sm text-red-600">
            {errors.price.monthly_rental_income.message}
          </p>
        )}
      </div>

      <div className="col-span-full">
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <input
            type="checkbox"
            id="price.price_on_request"
            {...register("price.price_on_request")}
            className="mt-1"
          />
          <label
            htmlFor="price.price_on_request"
            className="space-y-1 leading-none"
          >
            Price on request
          </label>
        </div>
      </div>

      <div className="col-span-full">
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <input
            type="checkbox"
            id="price.heating_in_additional_costs"
            {...register("price.heating_in_additional_costs")}
            className="mt-1"
          />
          <label
            htmlFor="price.heating_in_additional_costs"
            className="space-y-1 leading-none"
          >
            Heating in Additional Costs
          </label>
        </div>
      </div>
    </div>
  );
}
