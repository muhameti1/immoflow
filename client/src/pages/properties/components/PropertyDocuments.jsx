import React, { useState, useEffect } from "react";

import axiosInstance from "@/api/axios";
import { toast } from "sonner";

const PropertyDocuments = ({ propertyId }) => {
  const [form, setForm] = useState({
    title: "",
    document: null,
    category: "",
    expiration_date: "",
  });

  const [documents, setDocuments] = useState([]);

  // Fetch documents when the component loads
  const fetchDocuments = async () => {
    try {
      const response = await axiosInstance.get(
        `/properties/${propertyId}/documents`
      );
      setDocuments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("document", form.document); // Ensure this holds a valid file
    formData.append("category", form.category);
    if (form.expiration_date) {
      formData.append("expiration_date", form.expiration_date);
    }

    try {
      const response = await axiosInstance.post(
        `/properties/${propertyId}/documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      fetchDocuments(); // Refresh the document list
      setForm({
        title: "",
        document: null,
        category: "",
        expiration_date: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDelete = async (documentId) => {
    try {
      const response = await axiosInstance.delete(
        `/properties/${propertyId}/documents/${documentId}`
      );
      toast.success(response.data.message);
      fetchDocuments(); // Refresh the document list
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <h1>Property Documents</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => setForm({ ...form, document: e.target.files[0] })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.expiration_date}
          onChange={(e) =>
            setForm({ ...form, expiration_date: e.target.value })
          }
        />
        <button type="submit">Upload</button>
      </form>

      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <span>{doc.title}</span>
            <button onClick={() => handleDelete(doc.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyDocuments;
