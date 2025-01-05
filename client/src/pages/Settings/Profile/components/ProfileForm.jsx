import { Label } from "@/components/ui/label";
import { useProfileForm } from "../hooks/useProfileForm";
import { Input } from "@/components/ui/input";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";

export function ProfileForm({ user }) {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFormData,
  } = useProfileForm(user);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Label htmlFor="avatar">Profile Picture</Label>
        <Input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            id="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            disabled={isSubmitting}
            required
          />
          <FormField
            id="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isSubmitting}
            required
          />
          <FormField
            id="phone_number"
            label="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            error={errors.phone_number}
            disabled={isSubmitting}
            required
          />

          <FormField
            id="position"
            label="Position"
            value={formData.position}
            onChange={handleChange}
            error={errors.position}
            disabled={isSubmitting}
            required
          />
          <FormField
            id="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            disabled={isSubmitting}
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
