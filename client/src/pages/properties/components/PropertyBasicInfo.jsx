import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext, Controller } from "react-hook-form";

export function PropertyBasicInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-full">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="col-span-full">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archive">Archive</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <p className="mt-2 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      {/* Rest of the fields remain the same */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" type="text" {...register("category")} />
        {errors.category && (
          <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="object_type">Object Type</Label>
        <Input id="object_type" type="text" {...register("object_type")} />
        {errors.object_type && (
          <p className="mt-2 text-sm text-red-600">
            {errors.object_type.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="warnings">Warnings</Label>
        <Input id="warnings" type="text" {...register("warnings")} />
        {errors.warnings && (
          <p className="mt-2 text-sm text-red-600">{errors.warnings.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="features">Features</Label>
        <Input id="features" type="text" {...register("features")} />
        {errors.features && (
          <p className="mt-2 text-sm text-red-600">{errors.features.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="order_number">Order Number</Label>
        <Input id="order_number" type="text" {...register("order_number")} />
        {errors.order_number && (
          <p className="mt-2 text-sm text-red-600">
            {errors.order_number.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="unit_number">Unit Number</Label>
        <Input id="unit_number" type="text" {...register("unit_number")} />
        {errors.unit_number && (
          <p className="mt-2 text-sm text-red-600">
            {errors.unit_number.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="internal_note">Internal Note</Label>
        <Input type="text" id="internal_note" {...register("internal_note")} />
        {errors.internal_note && (
          <p className="mt-2 text-sm text-red-600">
            {errors.internal_note.message}
          </p>
        )}
      </div>
    </div>
  );
}
