// InviteForm.js
import React, { useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import axiosInstance from "@/api/axios";

const InviteForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axiosInstance.post("/invitations", { email });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Email Address</Label>
        <div className="flex space-x-2">
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
            className=""
          />
        </div>
      </div>

      <Button type="submit">Send Invitation</Button>
    </form>
  );
};

export default InviteForm;
