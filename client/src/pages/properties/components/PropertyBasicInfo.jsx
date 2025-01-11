import { useFormContext } from "react-hook-form";

export function PropertyBasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          {...register("status")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
          <option value="archive">Archive</option>
        </select>
        {errors.status && (
          <p className="mt-2 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <input
          id="category"
          type="text"
          {...register("category")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.category && (
          <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="object_type"
          className="block text-sm font-medium text-gray-700"
        >
          Object Type
        </label>
        <input
          id="object_type"
          type="text"
          {...register("object_type")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.object_type && (
          <p className="mt-2 text-sm text-red-600">
            {errors.object_type.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="warnings"
          className="block text-sm font-medium text-gray-700"
        >
          Warnings
        </label>
        <input
          id="warnings"
          type="text"
          {...register("warnings")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.warnings && (
          <p className="mt-2 text-sm text-red-600">{errors.warnings.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="features"
          className="block text-sm font-medium text-gray-700"
        >
          Features
        </label>
        <input
          id="features"
          type="text"
          {...register("features")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.features && (
          <p className="mt-2 text-sm text-red-600">{errors.features.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="order_number"
          className="block text-sm font-medium text-gray-700"
        >
          Order Number
        </label>
        <input
          id="order_number"
          type="text"
          {...register("order_number")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.order_number && (
          <p className="mt-2 text-sm text-red-600">
            {errors.order_number.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="unit_number"
          className="block text-sm font-medium text-gray-700"
        >
          Unit Number
        </label>
        <input
          id="unit_number"
          type="text"
          {...register("unit_number")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.unit_number && (
          <p className="mt-2 text-sm text-red-600">
            {errors.unit_number.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="internal_note"
          className="block text-sm font-medium text-gray-700"
        >
          Internal Note
        </label>
        <textarea
          id="internal_note"
          {...register("internal_note")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.internal_note && (
          <p className="mt-2 text-sm text-red-600">
            {errors.internal_note.message}
          </p>
        )}
      </div>
    </div>
  );
}
