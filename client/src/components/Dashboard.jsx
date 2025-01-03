import { useAuth } from "@/context/AuthContext";
import { LogoutButton } from "./LogoutButton";

const Dashboard = () => {
  const { user } = useAuth();

  console.log(user);
  console.log(user.name);
  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
