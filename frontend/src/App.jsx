import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainNavbar from "./components/MainNavbar";
import Footer from "./components/Footer";

import UserTravels from "./pages/UserTravels";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Confirmation from "./pages/Confirmation";
import Programs from "./pages/Programs";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const authPaths = ["/login", "/register", "/forgot-password"];

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = authPaths.includes(location.pathname);
  const hideFooter = isAuthPage || location.pathname === "/profile" || location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <MainNavbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<UserTravels />} />
          <Route path="/user" element={<UserTravels />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
