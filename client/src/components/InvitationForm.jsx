// InvitationForm.jsx
import { useState } from "react";
import axiosInstance from "@/api/axios";

const InvitationForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/invitations", { email });
      setMessage("Invitation sent successfully!");
      setEmail("");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Invitation"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default InvitationForm;
