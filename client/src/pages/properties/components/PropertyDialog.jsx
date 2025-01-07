// src/components/properties/PropertyDialog.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PropertyForm } from "./PropertyForm";

export function PropertyDialog({
  open,
  onOpenChange,
  property = null,
  onSuccess,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {property ? "Edit Property" : "Create New Property"}
          </DialogTitle>
        </DialogHeader>
        <PropertyForm
          property={property}
          onSuccess={() => {
            onSuccess?.();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
