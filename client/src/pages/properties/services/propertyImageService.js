import axiosInstance from "@/api/axios";

const apiClient = axiosInstance.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadPropertyImages = (propertyId, formData) => {
  return apiClient.post(`/properties/${propertyId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePropertyImage = (propertyId, imageId) => {
  return apiClient.delete(`/properties/${propertyId}/images/${imageId}`);
};

export const setPropertyThumbnail = (propertyId, imageId) => {
  return apiClient.put(`/properties/${propertyId}/images/${imageId}/thumbnail`);
};

export const getPropertyImages = async (propertyId) => {
  try {
    const response = await axiosInstance.get(
      `/properties/${propertyId}/images`
    );
    console.log("API Response:", response.data); // Debugging response
    return response.data; // This should be the array of images
  } catch (error) {
    console.error("Error fetching property images:", error);
    throw error;
  }
};

export const togglePortalVisibility = async (imageId, showInPortals) => {
  return await axiosInstance.patch(
    `/property-images/${imageId}/toggle-visibility`,
    { show_in_portals: showInPortals }
  );
};

export const setThumbnailImage = async (imageId) => {
  return await axiosInstance.post(`/property-images/${imageId}/set-thumbnail`);
};
