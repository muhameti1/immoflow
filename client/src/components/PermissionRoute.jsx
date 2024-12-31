import { useAuth } from "@/context/AuthContext";

const PermissionRoute = ({ children, permission }) => {
  const { user } = useAuth();
  return user && user.permissions.includes(permission) ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default PermissionRoute;
