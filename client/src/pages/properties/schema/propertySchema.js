import * as z from "zod";

export const propertySchema = z.object({
  // Basic Info
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

  // Price Info
  price: z.object({
    amount: z.number().min(0),
    price_per_meter: z.number().optional(),
    currency: z.string(),
    type: z.enum(["sale", "rent"]),
    price_on_request: z.boolean().optional(),
    warm_rent: z.number().optional(),
    cold_rent: z.number().optional(),
    heating_costs: z.number().optional(),
    additional_costs: z.number().optional(),
    non_transferable_costs: z.number().optional(),
    parking_price: z.number().optional(),
    monthly_rental_income: z.number().optional(),
    heating_in_additional_costs: z.boolean().optional(),
  }),

  // Area Info
  area: z
    .object({
      total_area: z.number().optional(),
      living_area: z.number().optional(),
      usable_area: z.number().optional(),
      land_area: z.number().optional(),
      storage_area: z.number().optional(),
      terrace_area: z.number().optional(),
      balcony_area: z.number().optional(),
      garden_area: z.number().optional(),
      basement_area: z.number().optional(),
      garage_area: z.number().optional(),
      parking_area: z.number().optional(),
    })
    .optional(),

  // Equipment Info
  equipment: z
    .object({
      bathtub: z.boolean().optional().default(false),
      shower: z.boolean().optional().default(false),
      guest_toilet: z.boolean().optional().default(false),
      alarm_system: z.boolean().optional().default(false),
      smart_lock: z.boolean().optional().default(false),
      air_conditioning: z.boolean().optional().default(false),
      floor_heating: z.boolean().optional().default(false),
      elevator: z.boolean().optional().default(false),
      barrier_free: z.boolean().optional().default(false),
      furnished: z.boolean().optional().default(false),
      balcony: z.boolean().optional().default(false),
      terrace: z.boolean().optional().default(false),
      garden: z.boolean().optional().default(false),
      parking: z.boolean().optional().default(false),
      garage: z.boolean().optional().default(false),
    })
    .optional(),

  // Additional Info
  additional: z
    .object({
      year_built: z.number().optional(),
      last_renovation_year: z.number().optional(),
      number_of_floors: z.number().optional(),
      floor_number: z.string().optional(),
      number_of_rooms: z.number().optional(),
      number_of_bathrooms: z.number().optional(),
      parking_spaces: z.number().optional(),
      energy_rating: z.string().optional(),
      heating_type: z.string().optional(),
      construction_type: z.string().optional(),
      building_condition: z.string().optional(),
      last_modernization: z.string().optional(),
      interior_quality: z.string().optional(),
    })
    .optional(),

  // Address Info
  address: z
    .object({
      street: z.string().optional(),
      street_number: z.string().optional(),
      zip_code: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional().default("Switzerland"),
      region: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      hide_exact_location: z.boolean().optional().default(false),
      directions: z.string().optional(),
    })
    .optional(),
});
