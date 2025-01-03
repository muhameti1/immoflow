// AcceptInvitation.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "@/api/axios";

const AcceptInvitation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `/invitations/${token}/accept`,
        formData
      );
      // Handle successful registration (e.g., store token, redirect)
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Choose a password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating Account..." : "Accept Invitation"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AcceptInvitation;
