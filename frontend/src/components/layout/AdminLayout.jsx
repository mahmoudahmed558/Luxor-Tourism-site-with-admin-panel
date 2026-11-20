// src/components/layout/AdminLayout.jsx
// Admin layout wrapper with sidebar navigation — English only
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import {
    FaChartBar, FaMapMarkedAlt, FaCalendarCheck,
    FaSignOutAlt, FaBars, FaTimes, FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import Dashboard from "../../pages/admin/Dashboard";
import AdminPrograms from "../../pages/admin/AdminPrograms";
import AdminBookings from "../../pages/admin/AdminBookings";
import AdminUsers from "../../pages/admin/AdminUsers";

const AdminShell = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { userProfile, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    const navItems = [
        { key: "dashboard", icon: <FaChartBar />, label: "Dashboard" },
        { key: "programs", icon: <FaMapMarkedAlt />, label: "Programs" },
        { key: "bookings", icon: <FaCalendarCheck />, label: "Bookings" },
        { key: "users", icon: <FaUsers />, label: "Users" },
    ];

    return (
        <div className="admin-shell">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="admin-sidebar-inner">
                    {/* Brand */}
                    <div className="admin-brand">
                        <span className="admin-brand-icon">🏝️</span>
                        <span className="admin-brand-text">Tourism Admin</span>
                    </div>

                    {/* Nav */}
                    <nav className="admin-nav">
                        {navItems.map((item) => (
                            <button
                                key={item.key}
                                className={`admin-nav-item ${activeTab === item.key ? "active" : ""}`}
                                onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
                            >
                                <span className="admin-nav-icon">{item.icon}</span>
                                <span className="admin-nav-label">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Bottom */}
                    <div className="admin-sidebar-bottom">
                        <div className="admin-user-chip">
                            <div className="admin-user-avatar">
                                {userProfile?.name?.[0]?.toUpperCase() || "A"}
                            </div>
                            <div>
                                <div className="admin-user-name">{userProfile?.name || "Admin"}</div>
                                <div className="admin-user-role">
                                    <Badge bg="warning" text="dark" className="small">Admin</Badge>
                                </div>
                            </div>
                        </div>
                        <button className="admin-logout-btn" onClick={handleLogout}>
                            <FaSignOutAlt className="me-2" /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main content */}
            <div className="admin-main">
                {/* Topbar */}
                <div className="admin-topbar">
                    <button className="admin-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Page Content */}
                <div className="admin-content">
                    {activeTab === "dashboard" && <Dashboard lang="en" />}
                    {activeTab === "programs" && <AdminPrograms lang="en" />}
                    {activeTab === "bookings" && <AdminBookings lang="en" />}
                    {activeTab === "users" && <AdminUsers />}
                </div>
            </div>
        </div>
    );
};

export default AdminShell;
