import { useState, useEffect } from "react";
import { toast } from "sonner";
import AdminLayout from "@/layouts/AdminLayout";
import SettingsLayout from "@/layouts/SettingsLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileTab from "./components/ProfileTab";
import SecurityTab from "./components/SecurityTab";
import { useUser } from "./hooks/useUser";

const ProfilePage = () => {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <SettingsLayout>
        <div className="container p-4 max-w-2xl">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab user={user} />
            </TabsContent>

            <TabsContent value="security">
              <SecurityTab user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </SettingsLayout>
    </AdminLayout>
  );
};

export default ProfilePage;
