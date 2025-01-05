import FormField from "@/components/FormField";
import { usePasswordForm } from "../hooks/usePasswordForm";
import { Button } from "@/components/ui/button";

export default function PasswordForm({ user }) {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    usePasswordForm(user);

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <FormField
          id="current_password"
          label="Current Password"
          type="password"
          value={formData.current_password}
          onChange={handleChange}
          error={errors.current_password}
          disabled={isSubmitting}
          required
        />

        <FormField
          id="new_password"
          label="New Password"
          type="password"
          value={formData.new_password}
          onChange={handleChange}
          error={errors.new_password}
          disabled={isSubmitting}
          required
        />

        <FormField
          id="new_password_confirmation"
          label="Confirm New Password"
          type="password"
          value={formData.new_password_confirmation}
          onChange={handleChange}
          error={errors.new_password_confirmation}
          disabled={isSubmitting}
          required
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
