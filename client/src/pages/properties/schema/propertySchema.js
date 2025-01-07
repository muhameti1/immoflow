// src/schemas/propertySchema.js
import * as z from "zod";

export const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "draft", "archive"]).optional(),
  category: z.string().optional(),
  object_type: z.string().optional(),
  warnings: z.string().optional(),
  features: z.string().optional(),
  order_number: z.string().optional(),
  unit_number: z.string().optional(),
  internal_note: z.string().optional(),

  price: z.object({
    amount: z.number().min(0, "Amount must be positive"),
    price_per_meter: z.number().min(0).optional(),
    currency: z.string().min(1, "Currency is required"),
    type: z.enum(["sale", "rent"], { required_error: "Type is required" }),
    price_on_request: z.boolean().default(false),
    warm_rent: z.number().min(0).optional(),
    cold_rent: z.number().min(0).optional(),
    heating_costs: z.number().min(0).optional(),
    additional_costs: z.number().min(0).optional(),
    non_transferable_costs: z.number().min(0).optional(),
    parking_price: z.number().min(0).optional(),
    monthly_rental_income: z.number().min(0).optional(),
    heating_in_additional_costs: z.boolean().default(false),
  }),

  area: z
    .object({
      total_area: z.number().min(0).optional(),
      living_area: z.number().min(0).optional(),
      usable_area: z.number().min(0).optional(),
      land_area: z.number().min(0).optional(),
      storage_area: z.number().min(0).optional(),
      terrace_area: z.number().min(0).optional(),
      balcony_area: z.number().min(0).optional(),
      garden_area: z.number().min(0).optional(),
      basement_area: z.number().min(0).optional(),
      garage_area: z.number().min(0).optional(),
      parking_area: z.number().min(0).optional(),
    })
    .optional(),

  additional: z
    .object({
      year_built: z.number().int().positive().optional().nullable(),
      last_renovation_year: z.number().int().positive().optional().nullable(),
      number_of_floors: z.number().int().positive().optional().nullable(),
      floor_number: z.string().optional(),
      number_of_rooms: z.number().int().positive().optional().nullable(),
      number_of_bathrooms: z.number().int().positive().optional().nullable(),
      parking_spaces: z.number().int().min(0).optional().nullable(),
      energy_rating: z.string().optional(),
      heating_type: z.string().optional(),
      construction_type: z.string().optional(),
      building_condition: z.string().optional(),
      last_modernization: z.string().optional(),
      interior_quality: z.string().optional(),
    })
    .optional(),

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
      street: z.string().optional(),
      street_number: z.string().optional(),
      zip_code: z.string().max(20).optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      region: z.string().optional(),
      latitude: z.number().min(-90).max(90).optional().nullable(),
      longitude: z.number().min(-180).max(180).optional().nullable(),
      hide_exact_location: z.boolean().default(false),
      directions: z.string().optional(),
    })
    .optional(),
});
