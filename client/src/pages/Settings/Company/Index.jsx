import { useState, useEffect } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import SettingsLayout from "@/layouts/SettingsLayout";
import ContentSection from "@/components/ContectSection";
import CompanyProfileForm from "./components/CompanyProfileForm";
import { useCompanyProfile } from "./hooks/useCompanyProfile";

const CompanyProfilePage = () => {
  const { company, isLoading } = useCompanyProfile();

  if (isLoading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <SettingsLayout>
        <ContentSection
          title="Company Profile"
          desc="Update your company details"
        />
        <div className="lg:max-w-2xl">
          <CompanyProfileForm initialData={company} />
        </div>
      </SettingsLayout>
    </AdminLayout>
  );
};

export default CompanyProfilePage;
