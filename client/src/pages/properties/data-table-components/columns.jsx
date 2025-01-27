import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/api/axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export const columns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "unit_number",
    header: "Unit Number",

    cell: ({ row }) => {
      const property = row.original;
      const unit_number = row.getValue("unit_number");
      return (
        <Link
          to={`/app/properties/${property.id}/edit`}
          className="hover:underline"
        >
          {unit_number}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          className={`capitalize ${
            status === "active"
              ? "bg-green-100 rounded-full"
              : status === "inactive"
              ? "bg-red-600 border-none rounded-full text-white"
              : "text-gray-600 rounded-full"
          }`}
          variant={
            status === "active"
              ? "secondary"
              : status === "inactive"
              ? "outline"
              : ""
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "object_type",
    header: "Type",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const property = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(property.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = `/properties/${property.id}`)
              }
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = `/app/properties/${property.id}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={async () => {
                try {
                  await axiosInstance.delete(`/properties/${property.id}`);
                  toast.success("Property deleted successfully");
                  window.location.reload();
                } catch (error) {
                  console.error("Error deleting property:", error);
                  toast.error("Error deleting property");
                }
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
