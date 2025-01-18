import React, { useEffect, useState } from "react";
import PropertyImageUpload from "./PropertyImageUpload";
import PropertyImageList from "./PropertyImageList";
import { getPropertyImages } from "../services/propertyImageService";

const PropertyImages = ({ propertyId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesData = await getPropertyImages(propertyId);
        console.log("Fetched Images:", imagesData); // Debugging
        setImages(imagesData); // Directly set the images array
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [propertyId]);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>{error}</p>;

  const handleUploadSuccess = (newImages) => {
    setImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Manage Property Images</h2>
      <PropertyImageUpload
        propertyId={propertyId}
        onUploadSuccess={handleUploadSuccess}
      />
      <PropertyImageList
        propertyId={propertyId}
        images={images}
        setImages={setImages}
      />
    </div>
  );
};

export default PropertyImages;
