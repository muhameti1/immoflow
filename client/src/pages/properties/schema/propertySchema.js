// src/schemas/propertySchema.js
import * as z from "zod";

export const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  status: z.enum(["active", "inactive", "draft", "archive"]).optional(),
  category: z.string().nullable().optional(),
  object_type: z.string().nullable().optional(),
  warnings: z.string().nullable().optional(),
  features: z.string().nullable().optional(),
  order_number: z.string().nullable().optional(),
  unit_number: z.string().nullable().optional(),
  internal_note: z.string().nullable().optional(),

  price: z.object({
    amount: z.coerce.number().min(0, "Amount must be positive"),
    price_per_meter: z.coerce.number().min(0).optional(),
    currency: z.string().min(1, "Currency is required"),
    type: z.enum(["sale", "rent"], { required_error: "Type is required" }),
    price_on_request: z.boolean().default(false),
    warm_rent: z.coerce.number().min(0).optional(),
    cold_rent: z.coerce.number().min(0).optional(),
    heating_costs: z.coerce.number().min(0).optional(),
    additional_costs: z.coerce.number().min(0).optional(),
    non_transferable_costs: z.coerce.number().min(0).optional(),
    parking_price: z.coerce.number().min(0).optional(),
    monthly_rental_income: z.coerce.number().min(0).optional(),
    heating_in_additional_costs: z.boolean().default(false),
  }),

  area: z
    .object({
      total_area: z.coerce.number().min(0).optional(),
      living_area: z.coerce.number().min(0).optional(),
      usable_area: z.coerce.number().min(0).optional(),
      land_area: z.coerce.number().min(0).optional(),
      storage_area: z.coerce.number().min(0).optional(),
      terrace_area: z.coerce.number().min(0).optional(),
      balcony_area: z.coerce.number().min(0).optional(),
      garden_area: z.coerce.number().min(0).optional(),
      basement_area: z.coerce.number().min(0).optional(),
      garage_area: z.coerce.number().min(0).optional(),
      parking_area: z.coerce.number().min(0).optional(),
    })
    .optional(),

  additional: z
    .object({
      year_built: z.coerce
        .number()
        .int()
        .transform((val) => (val === 0 ? null : val))
        .nullable()
        .optional(),
      last_renovation_year: z.coerce
        .number()
        .int()
        .transform((val) => (val === 0 ? null : val))
        .nullable()
        .optional(),
      number_of_floors: z.coerce
        .number()
        .int()
        .transform((val) => (val === 0 ? null : val))
        .nullable()
        .optional(),
      floor_number: z.string().nullable().optional(),
      number_of_rooms: z.coerce
        .number()
        .int()
        .transform((val) => (val === 0 ? null : val))
        .nullable()
        .optional(),
      number_of_bathrooms: z.coerce
        .number()
        .int()
        .transform((val) => (val === 0 ? null : val))
        .nullable()
        .optional(),
      parking_spaces: z.coerce
        .number()
        .int()
        .transform((val) => (val === 0 ? null : val))
        .nullable()
        .optional(),
      energy_rating: z.string().nullable().optional(),
      heating_type: z.string().nullable().optional(),
      construction_type: z.string().nullable().optional(),
      building_condition: z.string().nullable().optional(),
      last_modernization: z.string().nullable().optional(),
      interior_quality: z.string().nullable().optional(),
    })
    .optional()
    .nullable(),

  equipment: z
    .object({
      bathtub: z.boolean().default(false),
      shower: z.boolean().default(false),
      guest_toilet: z.boolean().default(false),
      alarm_system: z.boolean().default(false),
      smart_lock: z.boolean().default(false),
      air_conditioning: z.boolean().default(false),
      floor_heating: z.boolean().default(false),
      elevator: z.boolean().default(false),
      barrier_free: z.boolean().default(false),
      furnished: z.boolean().default(false),
      balcony: z.boolean().default(false),
      terrace: z.boolean().default(false),
      garden: z.boolean().default(false),
      parking: z.boolean().default(false),
      garage: z.boolean().default(false),
    })
    .optional(),

  address: z
    .object({
      street: z.string().nullable().optional(),
      street_number: z.string().nullable().optional(),
      zip_code: z.string().nullable().optional(),
      city: z.string().nullable().optional(),
      state: z.string().nullable().optional(),
      country: z.string().nullable().optional(),
      region: z.string().nullable().optional(),
      latitude: z.coerce.number().min(-90).max(90).optional().nullable(),
      longitude: z.coerce.number().min(-180).max(180).optional().nullable(),
      hide_exact_location: z.boolean().default(false),
      directions: z.string().nullable().optional(),
    })
    .optional(),
});
