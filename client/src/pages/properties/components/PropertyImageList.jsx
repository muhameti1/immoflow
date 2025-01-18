import React, { useState } from "react";
import { PenIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const PropertyImageList = ({ images, refreshImages, propertyId }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!images || images.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        No images available.
      </p>
    );
  }

  const handleDelete = async (imageId) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/properties/${propertyId}/images/${imageId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete image");

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });

      setSelectedImage(null);
      refreshImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetThumbnail = async (imageId) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/properties/${propertyId}/images/${imageId}/thumbnail`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) throw new Error("Failed to set thumbnail");

      toast({
        title: "Success",
        description: "Thumbnail updated successfully",
      });

      // refreshImages();
    } catch (error) {
      console.error("Error setting thumbnail:", error);
      toast({
        title: "Error",
        description: "Failed to set thumbnail",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePortalVisibility = async (imageId, currentVisibility) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/properties/${propertyId}/images/${imageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            show_in_portals: !currentVisibility,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update visibility");

      toast({
        title: "Success",
        description: "Visibility updated successfully",
      });

      refreshImages();
    } catch (error) {
      console.error("Error toggling visibility:", error);
      toast({
        title: "Error",
        description: "Failed to update visibility",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="relative group overflow-hidden">
            <div className="aspect-square">
              <img
                src={`http://localhost:8000/storage/${image.file_path}`}
                alt={image.image_title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setSelectedImage(image)}
                  className="rounded-full"
                >
                  <PenIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Image Details</DialogTitle>
          </DialogHeader>

          {selectedImage && (
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={`http://localhost:8000/storage/${selectedImage.file_path}`}
                  alt={selectedImage.image_title}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="space-y-2">
                <Label>Image Title</Label>
                <p className="text-sm">{selectedImage.image_title}</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="thumbnail"
                    checked={selectedImage.is_thumbnail}
                    onCheckedChange={() => handleSetThumbnail(selectedImage.id)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="thumbnail">Set as Thumbnail</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="portals"
                    checked={selectedImage.show_in_portals}
                    onCheckedChange={() =>
                      handleTogglePortalVisibility(
                        selectedImage.id,
                        selectedImage.show_in_portals
                      )
                    }
                    disabled={isLoading}
                  />
                  <Label htmlFor="portals">Show in Portals</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedImage.id)}
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete Image"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedImage(null)}
                  disabled={isLoading}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyImageList;
