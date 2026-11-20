// src/components/ProtectedRoute.jsx
// Redirects unauthenticated users to /login
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { currentUser, role, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Logged in, but does not have the required role
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
