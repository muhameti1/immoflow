import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BasicInfoFields = ({ formData, errors, isSubmitting, onChange }) => (
  <>
    <div className="space-y-2">
      <Label htmlFor="name">
        Company Name
        {errors.name && (
          <span className="text-red-500 text-sm ml-2">{errors.name}</span>
        )}
      </Label>
      <Input
        id="name"
        value={formData.name}
        onChange={onChange}
        className={errors.name ? "border-red-500" : ""}
        disabled={isSubmitting}
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="email">
        Email
        {errors.email && (
          <span className="text-red-500 text-sm ml-2">{errors.email}</span>
        )}
      </Label>
      <Input
        id="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        className={errors.email ? "border-red-500" : ""}
        disabled={isSubmitting}
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        value={formData.bio}
        onChange={onChange}
        disabled={isSubmitting}
        placeholder="Company description..."
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="location">Address</Label>
      <Input
        id="location"
        value={formData.location}
        onChange={onChange}
        disabled={isSubmitting}
        placeholder="123 Main St, City, Country"
      />
    </div>
  </>
);

export default BasicInfoFields;
