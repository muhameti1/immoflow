import { useState } from "react";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useCompanyForm } from "../hooks/useCompanyForm";
import BasicInfoFields from "./BasicInfoFields";
import BrandingFields from "./BrandingFields";
import { Button } from "@/components/ui/button";
import SocialLinksField from "./SocialLinksFields";

const CompanyProfileForm = ({ initialData }) => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleLogoChange,
    handleSocialLinkChange,
    addSocialLink,
    removeSocialLink,
  } = useCompanyForm(initialData);

  return (
    <Form>
      <form onSubmit={handleSubmit} className="space-y-8">
        <BasicInfoFields
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onChange={handleChange}
        />

        <BrandingFields
          formData={formData}
          isSubmitting={isSubmitting}
          onLogoChange={handleLogoChange}
          onColorChange={handleChange}
        />

        <SocialLinksField
          socialLinks={formData.social_links}
          isSubmitting={isSubmitting}
          onLinkChange={handleSocialLinkChange}
          onAddLink={addSocialLink}
          onRemoveLink={removeSocialLink}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};

export default CompanyProfileForm;
