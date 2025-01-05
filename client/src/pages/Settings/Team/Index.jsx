// src/pages/TeamManagement/TeamManagementPage.jsx
import { useState, useEffect } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import SettingsLayout from "@/layouts/SettingsLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamMembersTab from "./components/TeamMembersTab";
import InviteMembersTab from "./components/InviteMembersTab";
import { useTeamMembers } from "./hooks/useTeamMembers";

export default function TeamManagementPage() {
  const { users, loading } = useTeamMembers();

  return (
    <AdminLayout>
      <SettingsLayout>
        <div className="">
          <h1 className="text-3xl font-bold mb-6">Team Management</h1>
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="invite">Invite Members</TabsTrigger>
            </TabsList>

            <TabsContent value="members">
              <TeamMembersTab users={users} loading={loading} />
            </TabsContent>

            <TabsContent value="invite">
              <InviteMembersTab />
            </TabsContent>
          </Tabs>
        </div>
      </SettingsLayout>
    </AdminLayout>
  );
}
