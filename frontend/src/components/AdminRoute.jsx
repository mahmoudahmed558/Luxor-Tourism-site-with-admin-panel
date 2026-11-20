// src/components/AdminRoute.jsx
// Only allows users with role === 'admin'
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "react-bootstrap";

const AdminRoute = ({ children }) => {
    const { currentUser, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    }

    if (!currentUser) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/" replace />;

    return children;
};

export default AdminRoute;
