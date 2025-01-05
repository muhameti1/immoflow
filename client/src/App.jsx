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
import ProfilePage from "./pages/Account/Index";
import CompanyProfileForm from "./pages/Account/Company/Index";
import { AppearanceForm } from "./pages/Account/Appereance/Index";
import TeamPage from "./pages/Account/Team/Index";

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
            <Route path="/app/settings/team" element={<TeamPage />} />

            {/* Add other routes here */}
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
