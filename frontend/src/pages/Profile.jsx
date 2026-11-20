// src/pages/Profile.jsx
import { useState } from "react";
import {
    Container, Row, Col, Card, Button, Badge, Modal, Form, Spinner, Alert
} from "react-bootstrap";
import {
    FaUser, FaEnvelope, FaEdit, FaCalendarCheck, FaClock,
    FaCheck, FaTimes, FaUserShield, FaSave
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useUserBookings } from "../hooks/useBookings";

const Profile = () => {
    const { currentUser, userProfile, updateProfile, isAdmin } = useAuth();
    const { bookings, loading: bLoading } = useUserBookings(currentUser?.uid);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({ name: "", email: "" });
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState(null);

    const notify = (msg, type = "success") => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const openEdit = () => {
        setEditForm({
            name: userProfile?.name || userProfile?.displayName || "",
            email: userProfile?.email || "",
        });
        setShowEditModal(true);
    };

    const handleSave = async () => {
        if (!editForm.name.trim()) return;
        setSaving(true);
        try {
            await updateProfile({ name: editForm.name.trim(), displayName: editForm.name.trim() });
            setShowEditModal(false);
            notify("Profile updated successfully!");
        } catch (err) {
            notify(err.message, "danger");
        } finally {
            setSaving(false);
        }
    };

    const userName = userProfile?.name || userProfile?.displayName || "User";
    const userEmail = userProfile?.email || "—";
    const userRole = userProfile?.role || "tourist";
    const initials = userName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

    const formatDate = (ts) => {
        if (!ts) return "—";
        const d = new Date(ts);
        return d.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
    };

    const statusConfig = {
        pending: { bg: "warning", text: "dark", icon: <FaClock size={11} />, label: "Pending" },
        confirmed: { bg: "success", text: undefined, icon: <FaCheck size={11} />, label: "Confirmed" },
        cancelled: { bg: "danger", text: undefined, icon: <FaTimes size={11} />, label: "Cancelled" },
    };

    return (
        <div style={{ minHeight: "100vh", background: "#F0F4F8", paddingTop: 40, paddingBottom: 60 }}>
            <Container>
                {notification && (
                    <Alert variant={notification.type} className="rounded-3 mb-4" dismissible onClose={() => setNotification(null)}>
                        {notification.msg}
                    </Alert>
                )}

                <Row className="g-4">
                    {/* ─── Profile Card ─── */}
                    <Col lg={4}>
                        <Card className="border-0 shadow-sm text-center" style={{ borderRadius: 20, overflow: "hidden" }}>
                            {/* Banner */}
                            <div style={{
                                height: 120,
                                background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)",
                                position: "relative",
                            }}>
                                <div
                                    style={{
                                        position: "absolute", bottom: -40, left: "50%", transform: "translateX(-50%)",
                                        width: 80, height: 80, borderRadius: "50%", border: "4px solid #fff",
                                        background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fff", fontSize: "1.5rem", fontWeight: 700,
                                        boxShadow: "0 4px 15px rgba(99,102,241,.3)",
                                    }}
                                >
                                    {initials}
                                </div>
                            </div>

                            <Card.Body className="pt-5 pb-4 px-4">
                                <h5 className="fw-bold mb-1" style={{ color: "#1E293B" }}>{userName}</h5>
                                <p className="text-muted small mb-3">{userEmail}</p>
                                <Badge
                                    bg={isAdmin ? "warning" : "primary"}
                                    text={isAdmin ? "dark" : undefined}
                                    className="px-3 py-2 mb-4"
                                    style={{ fontSize: ".8rem" }}
                                >
                                    <FaUserShield className="me-1" size={12} />
                                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                                </Badge>

                                <div className="d-grid">
                                    <Button
                                        className="rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2"
                                        style={{
                                            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                                            border: "none",
                                        }}
                                        onClick={openEdit}
                                    >
                                        <FaEdit size={14} /> Edit Profile
                                    </Button>
                                </div>
                            </Card.Body>

                            {/* Stats */}
                            <div className="d-flex border-top" style={{ background: "#F8FAFC" }}>
                                <div className="flex-fill text-center py-3" style={{ borderRight: "1px solid #E2E8F0" }}>
                                    <div className="fw-bold" style={{ color: "#6366F1", fontSize: "1.3rem" }}>
                                        {bookings.length}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: ".75rem" }}>Bookings</div>
                                </div>
                                <div className="flex-fill text-center py-3" style={{ borderRight: "1px solid #E2E8F0" }}>
                                    <div className="fw-bold" style={{ color: "#10B981", fontSize: "1.3rem" }}>
                                        {bookings.filter((b) => b.status === "confirmed").length}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: ".75rem" }}>Confirmed</div>
                                </div>
                                <div className="flex-fill text-center py-3">
                                    <div className="fw-bold" style={{ color: "#F59E0B", fontSize: "1.3rem" }}>
                                        {bookings.filter((b) => b.status === "pending").length}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: ".75rem" }}>Pending</div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* ─── Booking History ─── */}
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm" style={{ borderRadius: 20 }}>
                            <Card.Header className="bg-white border-0 pt-4 pb-2 px-4" style={{ borderRadius: "20px 20px 0 0" }}>
                                <h5 className="fw-bold mb-0">
                                    <FaCalendarCheck className="me-2 text-primary" />
                                    Booking History
                                </h5>
                            </Card.Header>
                            <Card.Body className="p-0">
                                {bLoading ? (
                                    <div className="text-center py-5">
                                        <Spinner animation="border" variant="primary" />
                                    </div>
                                ) : bookings.length === 0 ? (
                                    <div className="text-center py-5">
                                        <FaCalendarCheck size={48} className="text-muted opacity-25 mb-3" />
                                        <p className="text-muted">No bookings yet. Start exploring our programs!</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0 align-middle">
                                            <thead style={{ background: "#F8FAFC" }}>
                                                <tr>
                                                    <th className="ps-4">Program</th>
                                                    <th>Passengers</th>
                                                    <th>Total</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings.map((b) => {
                                                    const sc = statusConfig[b.status] || statusConfig.pending;
                                                    return (
                                                        <tr key={b.id}>
                                                            <td className="ps-4 fw-semibold" style={{ color: "#1E293B" }}>
                                                                {b.programTitle || "—"}
                                                            </td>
                                                            <td className="text-muted">{b.participants || 1}</td>
                                                            <td className="fw-semibold" style={{ color: "#6366F1" }}>
                                                                {b.totalPrice || 0} EGP
                                                            </td>
                                                            <td className="text-muted" style={{ fontSize: ".85rem" }}>
                                                                {formatDate(b.createdAt)}
                                                            </td>
                                                            <td>
                                                                <Badge bg={sc.bg} text={sc.text} className="d-inline-flex align-items-center gap-1 px-2 py-1">
                                                                    {sc.icon} {sc.label}
                                                                </Badge>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* ─── Edit Profile Modal ─── */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton style={{ border: "none", padding: "20px 24px 0" }}>
                    <Modal.Title className="fw-bold" style={{ color: "#1E293B" }}>
                        <FaEdit className="me-2 text-primary" />Edit Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 pb-4 pt-3">
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold small text-muted">Full Name</Form.Label>
                        <div className="position-relative">
                            <FaUser className="position-absolute top-50 translate-middle-y text-muted" style={{ left: 14 }} />
                            <Form.Control
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                style={{ paddingLeft: "2.5rem", borderRadius: 10, padding: "10px 14px 10px 2.5rem" }}
                                placeholder="Your name"
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold small text-muted">Email Address</Form.Label>
                        <div className="position-relative">
                            <FaEnvelope className="position-absolute top-50 translate-middle-y text-muted" style={{ left: 14 }} />
                            <Form.Control
                                type="email"
                                value={editForm.email}
                                disabled
                                style={{ paddingLeft: "2.5rem", borderRadius: 10, padding: "10px 14px 10px 2.5rem", background: "#F8FAFC" }}
                            />
                        </div>
                        <Form.Text className="text-muted" style={{ fontSize: ".75rem" }}>
                            Email cannot be changed
                        </Form.Text>
                    </Form.Group>
                    <div className="d-flex gap-3">
                        <Button
                            variant="light"
                            className="rounded-pill px-4 flex-fill"
                            onClick={() => setShowEditModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="rounded-pill px-4 flex-fill fw-semibold d-flex align-items-center justify-content-center gap-2"
                            style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", border: "none" }}
                            onClick={handleSave}
                            disabled={saving || !editForm.name.trim()}
                        >
                            {saving ? <Spinner as="span" size="sm" /> : <><FaSave size={14} /> Save Changes</>}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Profile;
