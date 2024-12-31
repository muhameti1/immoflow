import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Toaster } from "sonner";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Unauthorized from "./components/Unauthorized";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthenticatedRoute>
                <Login />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthenticatedRoute>
                <Register />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <RoleRoute role="admin">
                  <AdminDashboard />
                </RoleRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Add other routes here */}
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
