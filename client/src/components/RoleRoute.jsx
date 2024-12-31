import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ role, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const hasRole = user.roles?.some((userRole) => userRole.name === role);

  if (!hasRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
export default RoleRoute;
