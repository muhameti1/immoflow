// src/pages/TeamManagement/components/TeamMembersActions.jsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useTeamActions } from "../hooks/useTeamActions";

export default function TeamMembersActions({ user }) {
  const { handleAdminToggle, handleDelete, handleEdit } = useTeamActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAdminToggle(user)}>
          Toggle Admin
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(user.id)}>
          Delete User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEdit(user)}>
          Edit User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
