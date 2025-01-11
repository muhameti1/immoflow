import { useFormContext } from "react-hook-form";

export default function PropertyAddressInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="address.street"
          className="block text-sm font-medium text-gray-700"
        >
          Street
        </label>
        <input
          id="address.street"
          type="text"
          {...register("address.street")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address?.street && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.street.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address.street_number"
          className="block text-sm font-medium text-gray-700"
        >
          Street Number
        </label>
        <input
          id="address.street_number"
          type="text"
          {...register("address.street_number")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address?.street_number && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.street_number.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address.zip_code"
          className="block text-sm font-medium text-gray-700"
        >
          Zip Code
        </label>
        <input
          id="address.zip_code"
          type="text"
          {...register("address.zip_code")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address?.zip_code && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.zip_code.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address.city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <input
          id="address.city"
          type="text"
          {...register("address.city")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address?.city && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.city.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address.state"
          className="block text-sm font-medium text-gray-700"
        >
          State
        </label>
        <input
          id="address.state"
          type="text"
          {...register("address.state")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address?.state && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.state.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address.country"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <input
          id="address.country"
          type="text"
          {...register("address.country")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address?.country && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.country.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address.region"
          className="block text-sm font-medium text-gray-700"
        >
          Region
        </label>
        <input
          id="address.region"
          type="text"
          {...register("address.region")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address?.region && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.region.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address.latitude"
          className="block text-sm font-medium text-gray-700"
        >
          Latitude
        </label>
        <input
          id="address.latitude"
          type="number"
          step="any"
          {...register("address.latitude")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address?.latitude && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.latitude.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address.longitude"
          className="block text-sm font-medium text-gray-700"
        >
          Longitude
        </label>
        <input
          id="address.longitude"
          type="number"
          step="any"
          {...register("address.longitude")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address?.longitude && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.longitude.message}
          </p>
        )}
      </div>

      <div className="col-span-full">
        <div className="flex flex-row items-start space-x-3 space-y-0">
          <input
            type="checkbox"
            id="address.hide_exact_location"
            {...register("address.hide_exact_location")}
            className="mt-1"
          />
          <label
            htmlFor="address.hide_exact_location"
            className="space-y-1 leading-none"
          >
            Hide Exact Location
          </label>
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="address.directions"
          className="block text-sm font-medium text-gray-700"
        >
          Directions
        </label>
        <textarea
          id="address.directions"
          {...register("address.directions")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address?.directions && (
          <p className="mt-2 text-sm text-red-600">
            {errors.address.directions.message}
          </p>
        )}
      </div>
    </div>
  );
}
