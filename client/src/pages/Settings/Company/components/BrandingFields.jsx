// src/features/company-profile/components/BrandingFields.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BrandingFields = ({
  formData,
  isSubmitting,
  onLogoChange,
  onColorChange,
}) => (
  <>
    <div className="space-y-2 col-span-2">
      <Label htmlFor="color_brand_company">Brand Colors</Label>
      <Input
        type="color"
        id="color_brand_company"
        value={formData.color_brand_company}
        onChange={onColorChange}
        disabled={isSubmitting}
        className="h-10 border rounded-md cursor-pointer"
      />
    </div>

    <div className="space-y-2 col-span-2">
      <Label htmlFor="logo">Logo</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={onLogoChange}
        disabled={isSubmitting}
      />
    </div>
  </>
);

export default BrandingFields;
