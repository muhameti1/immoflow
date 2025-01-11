import { useFormContext } from "react-hook-form";

export function PropertyAreaInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="area.total_area"
          className="block text-sm font-medium text-gray-700"
        >
          Total Area (m²)
        </label>
        <input
          id="area.total_area"
          type="number"
          {...register("area.total_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.area?.total_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.total_area.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="area.living_area"
          className="block text-sm font-medium text-gray-700"
        >
          Living Area (m²)
        </label>
        <input
          id="area.living_area"
          type="number"
          {...register("area.living_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.area?.living_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.living_area.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="area.usable_area"
          className="block text-sm font-medium text-gray-700"
        >
          Usable Area (m²)
        </label>
        <input
          id="area.usable_area"
          type="number"
          {...register("area.usable_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.area?.usable_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.usable_area.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="area.land_area"
          className="block text-sm font-medium text-gray-700"
        >
          Land Area (m²)
        </label>
        <input
          id="area.land_area"
          type="number"
          {...register("area.land_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.area?.land_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.land_area.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="area.storage_area"
          className="block text-sm font-medium text-gray-700"
        >
          Storage Area (m²)
        </label>
        <input
          id="area.storage_area"
          type="number"
          {...register("area.storage_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.area?.storage_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.storage_area.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="area.terrace_area"
          className="block text-sm font-medium text-gray-700"
        >
          Terrace Area (m²)
        </label>
        <input
          id="area.terrace_area"
          type="number"
          {...register("area.terrace_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.area?.terrace_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.terrace_area.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="area.balcony_area"
          className="block text-sm font-medium text-gray-700"
        >
          Balcony Area (m²)
        </label>
        <input
          id="area.balcony_area"
          type="number"
          {...register("area.balcony_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.area?.balcony_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.balcony_area.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="area.garden_area"
          className="block text-sm font-medium text-gray-700"
        >
          Garden Area (m²)
        </label>
        <input
          id="area.garden_area"
          type="number"
          {...register("area.garden_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.area?.garden_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.garden_area.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="area.basement_area"
          className="block text-sm font-medium text-gray-700"
        >
          Basement Area (m²)
        </label>
        <input
          id="area.basement_area"
          type="number"
          {...register("area.basement_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.area?.basement_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.basement_area.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="area.garage_area"
          className="block text-sm font-medium text-gray-700"
        >
          Garage Area (m²)
        </label>
        <input
          id="area.garage_area"
          type="number"
          {...register("area.garage_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.area?.garage_area && (
          <p className="mt-2 text-sm text-red-600">
            {errors.area.garage_area.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="area.parking_area"
          className="block text-sm font-medium text-gray-700"
        >
          Parking Area (m²)
        </label>
        <input
          id="area.parking_area"
          type="number"
          {...register("area.parking_area")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
