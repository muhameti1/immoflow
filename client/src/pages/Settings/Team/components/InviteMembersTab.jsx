// src/pages/TeamManagement/components/InviteMembersTab.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InviteForm from "@/pages/Invitations/Index";

export default function InviteMembersTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Invite New Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <InviteForm />
      </CardContent>
    </Card>
  );
}
