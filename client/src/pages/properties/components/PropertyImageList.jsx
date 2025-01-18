// PropertyImageList.jsx
import React from "react";
import {
  deletePropertyImage,
  setThumbnailImage,
  togglePortalVisibility,
} from "../services/propertyImageService";

const PropertyImageList = ({ images, refreshImages }) => {
  if (!images || images.length === 0) {
    return <p>No images available.</p>;
  }

  const handleDelete = async (imageId) => {
    try {
      await deletePropertyImage(imageId);
      alert("Image deleted successfully.");
      refreshImages(); // Refresh the images list after deletion
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image.");
    }
  };

  const handleSetThumbnail = async (imageId) => {
    try {
      await setThumbnailImage(imageId);
      alert("Thumbnail updated successfully.");
      refreshImages(); // Refresh the images list after setting a thumbnail
    } catch (error) {
      console.error("Error setting thumbnail:", error);
      alert("Failed to set thumbnail.");
    }
  };

  const handleTogglePortalVisibility = async (imageId, currentVisibility) => {
    try {
      await togglePortalVisibility(imageId, !currentVisibility);
      alert("Visibility updated successfully.");
      refreshImages(); // Refresh the images list after toggling visibility
    } catch (error) {
      console.error("Error toggling visibility:", error);
      alert("Failed to update visibility.");
    }
  };

  return (
    <div>
      {images.map((image) => (
        <div
          key={image.id}
          style={{
            marginBottom: "16px",
            border: "1px solid #ccc",
            padding: "8px",
          }}
        >
          <img
            src={`http://localhost:8000/storage/${image.file_path}`}
            alt={image.image_title}
            style={{ width: "100px", height: "100px", display: "block" }}
          />
          <p>{image.image_title}</p>
          <p>
            <strong>Thumbnail:</strong> {image.is_thumbnail ? "Yes" : "No"}
          </p>
          <p>
            <strong>Show in Portals:</strong>{" "}
            {image.show_in_portals ? "Yes" : "No"}
          </p>
          <button onClick={() => handleSetThumbnail(image.id)}>
            Set as Thumbnail
          </button>
          <button
            onClick={() =>
              handleTogglePortalVisibility(image.id, image.show_in_portals)
            }
          >
            {image.show_in_portals ? "Hide from Portals" : "Show in Portals"}
          </button>
          <button onClick={() => handleDelete(image.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PropertyImageList;
