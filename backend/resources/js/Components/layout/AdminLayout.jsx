// src/components/layout/AdminLayout.jsx
// Admin layout wrapper with sidebar navigation
import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import MainNavbar from "../MainNavbar";
import { Badge, Dropdown } from "react-bootstrap";
import {
    FaChartBar, FaMapMarkedAlt, FaCalendarCheck,
    FaSignOutAlt, FaBars, FaTimes, FaUsers, FaEnvelope
} from "react-icons/fa";

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth, url } = usePage().props;
    const userProfile = auth?.user || null;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post("/logout");
    };

    const navItems = [
        { href: "/admin", icon: <FaChartBar />, label: "Dashboard" },
        { href: "/admin/programs", icon: <FaMapMarkedAlt />, label: "Programs" },
        { href: "/admin/bookings", icon: <FaCalendarCheck />, label: "Bookings" },
        { href: "/admin/users", icon: <FaUsers />, label: "Users" },
        { href: "/admin/messages", icon: <FaEnvelope />, label: "Messages" },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <MainNavbar />
            <div className="admin-shell flex-grow">
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
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`admin-nav-item text-decoration-none ${url === item.href ? "active" : ""}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="admin-nav-icon">{item.icon}</span>
                                <span className="admin-nav-label">{item.label}</span>
                            </Link>
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
                <div className="admin-topbar d-flex justify-content-between align-items-center w-100">
                    <button className="admin-hamburger d-lg-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    
                    <div className="ms-auto">
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center gap-2 border-0 bg-transparent shadow-none">
                                <div className="admin-user-avatar d-none d-sm-flex" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                                    {userProfile?.name?.[0]?.toUpperCase() || "A"}
                                </div>
                                <span className="d-none d-sm-inline-block text-dark fw-medium">
                                    {userProfile?.name?.split(' ')[0] || "Admin"}
                                </span>
                                <span className="d-inline-block d-sm-none text-dark fw-medium">
                                    <FaUsers />
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="shadow border-0 rounded-3" style={{ minWidth: '200px' }}>
                                <div className="px-3 py-2 border-bottom mb-2">
                                    <p className="mb-0 fw-bold">{userProfile?.name || "Admin User"}</p>
                                    <p className="mb-0 text-muted small">{userProfile?.email || "admin@example.com"}</p>
                                </div>
                                <Dropdown.Item as={Link} href="/admin">
                                    <FaChartBar className="me-2 text-muted" /> Dashboard
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout} className="text-danger">
                                    <FaSignOutAlt className="me-2" /> Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                {/* Page Content */}
                <div className="admin-content">
                    {children}
                </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
