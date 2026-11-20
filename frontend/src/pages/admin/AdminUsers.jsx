// src/pages/admin/AdminUsers.jsx
import { useState, useEffect } from "react";
import {
    Card, Button, Modal, Badge, Spinner, Alert, Form
} from "react-bootstrap";
import {
    FaUsers, FaSearch, FaTrash, FaExclamationTriangle
} from "react-icons/fa";
import { getAllUsers, deleteUser, updateUserRole } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

const AdminUsers = () => {
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [notification, setNotification] = useState(null);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            notify(err.message, "danger");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    const notify = (msg, type = "success") => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleRoleChange = async (uid, newRole) => {
        try {
            await updateUserRole(uid, newRole);
            setUsers((prev) =>
                prev.map((u) => (u.uid === uid ? { ...u, role: newRole } : u))
            );
            notify(`User role updated to ${newRole}`);
        } catch (err) {
            notify(err.message, "danger");
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await deleteUser(deleteTarget.uid);
            setUsers((prev) => prev.filter((u) => u.uid !== deleteTarget.uid));
            setDeleteTarget(null);
            notify("User deleted successfully");
        } catch (err) {
            notify(err.message, "danger");
        } finally {
            setDeleting(false);
        }
    };

    const filtered = users.filter((u) => {
        const q = search.toLowerCase();
        return (
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.role?.toLowerCase().includes(q)
        );
    });

    const formatDate = (ts) => {
        if (!ts) return "—";
        const d = new Date(ts);
        return d.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
    };

    const roleBadge = (role) => {
        const map = { admin: "warning", tourist: "info" };
        return (
            <Badge bg={map[role] || "secondary"} text={role === "admin" ? "dark" : undefined}>
                {role === "admin" ? "Admin" : "Tourist"}
            </Badge>
        );
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 300 }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div>
            {notification && (
                <Alert variant={notification.type} className="rounded-3 py-2 mb-3" dismissible onClose={() => setNotification(null)}>
                    {notification.msg}
                </Alert>
            )}

            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                <h5 className="fw-bold mb-0">
                    <FaUsers className="me-2 text-primary" />
                    Manage Users
                    <Badge bg="light" text="dark" className="ms-2 fs-6">{users.length}</Badge>
                </h5>
                <div className="position-relative" style={{ maxWidth: 300, flex: "1 1 200px" }}>
                    <FaSearch className="position-absolute top-50 translate-middle-y text-muted" style={{ left: 12 }} />
                    <Form.Control
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ paddingLeft: "2.5rem", borderRadius: 10 }}
                    />
                </div>
            </div>

            <Card className="border-0 shadow-sm" style={{ borderRadius: 16, overflow: "hidden" }}>
                <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                        <thead style={{ background: "#F8FAFC" }}>
                            <tr>
                                <th className="ps-4" style={{ minWidth: 200 }}>User</th>
                                <th style={{ minWidth: 180 }}>Email</th>
                                <th style={{ minWidth: 100 }}>Role</th>
                                <th style={{ minWidth: 120 }}>Joined</th>
                                <th style={{ minWidth: 160 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center text-muted py-5">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((user) => (
                                    <tr key={user.uid}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <div
                                                    className="d-flex align-items-center justify-content-center fw-bold text-white"
                                                    style={{
                                                        width: 40, height: 40, borderRadius: "50%",
                                                        background: user.role === "admin"
                                                            ? "linear-gradient(135deg, #F59E0B, #D97706)"
                                                            : "linear-gradient(135deg, #6366F1, #8B5CF6)",
                                                        fontSize: ".85rem", flexShrink: 0,
                                                    }}
                                                >
                                                    {user.name?.[0]?.toUpperCase() || "?"}
                                                </div>
                                                <div>
                                                    <div className="fw-semibold" style={{ color: "#1E293B" }}>
                                                        {user.name || "—"}
                                                    </div>
                                                    <div className="text-muted" style={{ fontSize: ".75rem" }}>
                                                        {user.uid}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-muted" style={{ fontSize: ".9rem" }}>{user.email}</td>
                                        <td>{roleBadge(user.role)}</td>
                                        <td className="text-muted" style={{ fontSize: ".85rem" }}>
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Form.Select
                                                    size="sm"
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                                                    style={{ width: "auto", borderRadius: 8, fontSize: ".85rem" }}
                                                    disabled={user.uid === currentUser?.uid}
                                                >
                                                    <option value="tourist">Tourist</option>
                                                    <option value="admin">Admin</option>
                                                </Form.Select>
                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    className="rounded-pill px-2"
                                                    onClick={() => setDeleteTarget(user)}
                                                    disabled={user.uid === currentUser?.uid}
                                                    title={user.uid === currentUser?.uid ? "Can't delete yourself" : "Delete user"}
                                                >
                                                    <FaTrash size={12} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal show={!!deleteTarget} onHide={() => setDeleteTarget(null)} centered>
                <Modal.Body className="text-center p-5">
                    <FaExclamationTriangle size={48} className="text-warning mb-3" />
                    <h5 className="fw-bold mb-2">Delete this user?</h5>
                    <p className="text-muted small mb-1 fw-semibold">{deleteTarget?.name}</p>
                    <p className="text-muted small mb-4">{deleteTarget?.email}</p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button variant="light" className="rounded-pill px-4" onClick={() => setDeleteTarget(null)}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="rounded-pill px-4" onClick={handleDelete} disabled={deleting}>
                            {deleting ? <Spinner as="span" size="sm" /> : <><FaTrash className="me-1" /> Delete</>}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminUsers;
