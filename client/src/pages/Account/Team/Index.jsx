import { useState, useEffect } from "react";
import axiosInstance from "@/api/axios";
import AdminLayout from "@/layouts/AdminLayout";
import SettingsLayout from "@/layouts/SettingsLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InviteForm from "@/pages/Invitations/Index";
import { DataTable } from "@/pages/properties/data-table-components/data-table";
import { Button } from "@/components/ui/button";

export default function TeamsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      id: "roles",
      header: "Role",
      cell: ({ row }) => {
        const roles = row.original.roles || [];
        return roles.map((role) => role.name).join(", ");
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleAdminToggle(row.original)}
          >
            Toggle Admin
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/company/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch team members");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <SettingsLayout>
        <div className="">
          <h1 className="text-3xl font-bold mb-6">Team Management</h1>

          <Tabs defaultValue="invite" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="invite">Invite Members</TabsTrigger>
              <TabsTrigger value="members">Team Members</TabsTrigger>
            </TabsList>

            <TabsContent value="invite">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Invite New Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InviteForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <DataTable columns={columns} data={users} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SettingsLayout>
    </AdminLayout>
  );
}
