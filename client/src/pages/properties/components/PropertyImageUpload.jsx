import React, { useState } from "react";
import { uploadPropertyImages } from "../services/propertyImageService";
import { toast } from "sonner";

const PropertyImageUpload = ({ propertyId, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images[]", file));

    setUploading(true);
    try {
      const response = await uploadPropertyImages(propertyId, formData);
      toast.success("Images uploaded successfully");
      onUploadSuccess(response.data.images);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default PropertyImageUpload;
