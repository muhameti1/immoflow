// src/pages/TeamManagement/components/TeamMembersTab.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TeamMembersActions from "./TeamMembersActions";
import { DataTable } from "@/pages/properties/data-table-components/data-table";

export default function TeamMembersTab({ users, loading }) {
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
      cell: ({ row }) => <TeamMembersActions user={row.original} />,
    },
  ];

  return (
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
  );
}
