// src/pages/Profile/components/FormField.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  disabled,
  required,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={error ? "border-red-500" : ""}
        disabled={disabled}
        required={required}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
