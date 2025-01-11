import { useFormContext } from "react-hook-form";

export default function PropertyAdditionalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="additional.year_built"
          className="block text-sm font-medium text-gray-700"
        >
          Year Built
        </label>
        <input
          id="additional.year_built"
          type="number"
          {...register("additional.year_built")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.year_built && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.year_built.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.last_renovation_year"
          className="block text-sm font-medium text-gray-700"
        >
          Last Renovation Year
        </label>
        <input
          id="additional.last_renovation_year"
          type="number"
          {...register("additional.last_renovation_year")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.last_renovation_year && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.last_renovation_year.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.number_of_floors"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Floors
        </label>
        <input
          id="additional.number_of_floors"
          type="number"
          {...register("additional.number_of_floors")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.number_of_floors && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.number_of_floors.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.floor_number"
          className="block text-sm font-medium text-gray-700"
        >
          Floor Number
        </label>
        <input
          id="additional.floor_number"
          type="text"
          {...register("additional.floor_number")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.floor_number && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.floor_number.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.number_of_rooms"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Rooms
        </label>
        <input
          id="additional.number_of_rooms"
          type="number"
          {...register("additional.number_of_rooms")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.number_of_rooms && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.number_of_rooms.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.number_of_bathrooms"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Bathrooms
        </label>
        <input
          id="additional.number_of_bathrooms"
          type="number"
          {...register("additional.number_of_bathrooms")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.number_of_bathrooms && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.number_of_bathrooms.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.parking_spaces"
          className="block text-sm font-medium text-gray-700"
        >
          Parking Spaces
        </label>
        <input
          id="additional.parking_spaces"
          type="number"
          {...register("additional.parking_spaces")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.parking_spaces && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.parking_spaces.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.energy_rating"
          className="block text-sm font-medium text-gray-700"
        >
          Energy Rating
        </label>
        <input
          id="additional.energy_rating"
          type="text"
          {...register("additional.energy_rating")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.energy_rating && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.energy_rating.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.heating_type"
          className="block text-sm font-medium text-gray-700"
        >
          Heating Type
        </label>
        <input
          id="additional.heating_type"
          type="text"
          {...register("additional.heating_type")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.heating_type && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.heating_type.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.construction_type"
          className="block text-sm font-medium text-gray-700"
        >
          Construction Type
        </label>
        <input
          id="additional.construction_type"
          type="text"
          {...register("additional.construction_type")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.construction_type && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.construction_type.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.building_condition"
          className="block text-sm font-medium text-gray-700"
        >
          Building Condition
        </label>
        <input
          id="additional.building_condition"
          type="text"
          {...register("additional.building_condition")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.building_condition && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.building_condition.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.last_modernization"
          className="block text-sm font-medium text-gray-700"
        >
          Last Modernization
        </label>
        <input
          id="additional.last_modernization"
          type="text"
          {...register("additional.last_modernization")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.additional?.last_modernization && (
          <p className="mt-2 text-sm text-red-600">
            {errors.additional.last_modernization.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="additional.interior_quality"
          className="block text-sm font-medium text-gray-700"
        >
          Interior Quality
        </label>
        <input
          id="additional.interior_quality"
          type="text"
          {...register("additional.interior_quality")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
