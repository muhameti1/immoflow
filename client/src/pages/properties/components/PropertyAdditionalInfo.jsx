// src/components/properties/sections/PropertyAdditionalInfo.jsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PropertyAdditionalInfo({ form }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="additional.year_built"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year Built</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.last_renovation_year"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Renovation Year</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.number_of_floors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Floors</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.floor_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Floor Number</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.number_of_rooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Rooms</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.number_of_bathrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Bathrooms</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.energy_rating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Energy Rating</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select energy rating" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="D">D</SelectItem>
                <SelectItem value="E">E</SelectItem>
                <SelectItem value="F">F</SelectItem>
                <SelectItem value="G">G</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.heating_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Heating Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select heating type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="gas">Gas</SelectItem>
                <SelectItem value="oil">Oil</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="district">District Heating</SelectItem>
                <SelectItem value="heat_pump">Heat Pump</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.building_condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Building Condition</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="first_occupancy">First Occupancy</SelectItem>
                <SelectItem value="renovated">Renovated</SelectItem>
                <SelectItem value="maintained">Well Maintained</SelectItem>
                <SelectItem value="needs_renovation">
                  Needs Renovation
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
