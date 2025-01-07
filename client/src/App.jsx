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
import Index from "./pages/properties/Index";
import { ThemeProvider } from "./components/theme-provider";
import InvitationForm from "./components/InvitationForm";
import InviteForm from "./pages/Invitations/Index";
import AcceptInvitation from "./pages/Invitations/Accept";
import CompanyProfileForm from "./pages/Settings/Company/Index";
import { AppearanceForm } from "./pages/Settings/Appereance/Index";
import TeamPage from "./pages/Settings/Team/Index";
import TeamManagementPage from "./pages/Settings/Team/Index";
import ProfilePage from "./pages/Settings/Profile/ProfilePage";
import { PropertyForm } from "./pages/properties/components/PropertyForm";
import EditProperty from "./pages/properties/Edit";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
              path="/app/dashboard"
              element={
                <ProtectedRoute>
                  <RoleRoute role="admin">
                    <AdminDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/properties"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/invite" element={<InviteForm />} />
            <Route path="/accept-invite" element={<AcceptInvitation />} />
            <Route path="/app/settings" element={<ProfilePage />} />
            <Route
              path="/app/settings/company"
              element={<CompanyProfileForm />}
            />
            <Route
              path="/app/settings/appearance"
              element={<AppearanceForm />}
            />
            <Route path="/app/settings/team" element={<TeamManagementPage />} />
            <Route path="/app/properties/create" element={<PropertyForm />} />
            <Route path="/app/properties/:id/edit" element={<EditProperty />} />

            {/* Add other routes here */}
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
