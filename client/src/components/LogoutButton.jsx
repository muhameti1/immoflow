import axiosInstance from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      localStorage.removeItem("token");
      toast("User logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(
        <div style={{ color: "red" }}>
          <strong>Error:</strong> {error.message}
        </div>
      );
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
