// src/pages/admin/AdminBookings.jsx
import { useState } from "react";
import {
    Card, Badge, Button, Spinner, Alert, Form, Row, Col
} from "react-bootstrap";
import {
    FaCheckCircle, FaTimesCircle, FaClock,
    FaSearch, FaFilter, FaCalendarAlt, FaUsers, FaMoneyBillWave
} from "react-icons/fa";
import { useAllBookings } from "../../hooks/useBookings";
import { updateBookingStatus } from "../../services/bookingService";

const STATUS_CONFIG = {
    pending: { label_ar: "قيد الانتظار", label_en: "Pending", color: "warning", icon: <FaClock /> },
    confirmed: { label_ar: "مؤكد", label_en: "Confirmed", color: "success", icon: <FaCheckCircle /> },
    cancelled: { label_ar: "ملغي", label_en: "Cancelled", color: "danger", icon: <FaTimesCircle /> },
};

const AdminBookings = ({ lang = "ar" }) => {
    const isRTL = lang === "ar";
    const { bookings, loading, error } = useAllBookings();

    const [statusFilter, setStatusFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [updating, setUpdating] = useState(null);
    const [notification, setNotification] = useState(null);

    const notify = (msg, type = "success") => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const changeStatus = async (bookingId, newStatus) => {
        setUpdating(bookingId);
        try {
            await updateBookingStatus(bookingId, newStatus);
            notify(
                lang === "ar"
                    ? `تم تحديث الحالة إلى: ${STATUS_CONFIG[newStatus]?.label_ar}`
                    : `Status updated to: ${STATUS_CONFIG[newStatus]?.label_en}`
            );
        } catch (err) {
            notify(err.message, "danger");
        } finally {
            setUpdating(null);
        }
    };

    const filtered = bookings.filter((b) => {
        const matchStatus = statusFilter === "all" || b.status === statusFilter;
        const matchSearch =
            !search ||
            (b.programTitle || "").toLowerCase().includes(search.toLowerCase()) ||
            (b.passengerName || "").toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    const formatDate = (ts) => {
        if (!ts) return "—";
        const d = ts.toDate ? ts.toDate() : new Date(ts);
        return d.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
            year: "numeric", month: "short", day: "numeric",
        });
    };

    const lb = {
        ar: {
            title: "إدارة الحجوزات",
            search: "ابحث بالبرنامج أو الاسم...",
            all: "الكل", pending: "قيد الانتظار", confirmed: "مؤكدة", cancelled: "ملغية",
            program: "البرنامج", passenger: "العميل", date: "التاريخ",
            participants: "الأشخاص", total: "الإجمالي", status: "الحالة", actions: "إجراءات",
            confirm: "تأكيد", cancel: "إلغاء",
            noResults: "لا توجد حجوزات مطابقة",
            egp: "ج.م",
        },
        en: {
            title: "Manage Bookings",
            search: "Search by program or name...",
            all: "All", pending: "Pending", confirmed: "Confirmed", cancelled: "Cancelled",
            program: "Program", passenger: "Customer", date: "Date",
            participants: "Persons", total: "Total", status: "Status", actions: "Actions",
            confirm: "Confirm", cancel: "Cancel",
            noResults: "No matching bookings",
            egp: "EGP",
        },
    };
    const t = lb[lang] || lb.en;

    return (
        <div dir={isRTL ? "rtl" : "ltr"}>
            {notification && (
                <Alert variant={notification.type} className="rounded-3 py-2 mb-3" dismissible onClose={() => setNotification(null)}>
                    {notification.msg}
                </Alert>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">{t.title}</h5>
                <Badge bg="primary" className="fs-6 px-3 py-2">{filtered.length}</Badge>
            </div>

            {/* Filters Row */}
            <Row className="g-3 mb-4">
                <Col md={6}>
                    <div className="search-wrapper">
                        <FaSearch className="search-icon" />
                        <Form.Control
                            placeholder={t.search}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                            style={{ paddingInlineStart: "2.5rem" }}
                        />
                    </div>
                </Col>
                <Col md={6}>
                    <div className="d-flex gap-2">
                        {["all", "pending", "confirmed", "cancelled"].map((s) => (
                            <Button
                                key={s}
                                size="sm"
                                variant={statusFilter === s ? "primary" : "outline-secondary"}
                                className="rounded-pill px-3 flex-grow-1"
                                onClick={() => setStatusFilter(s)}
                            >
                                {t[s]}
                            </Button>
                        ))}
                    </div>
                </Col>
            </Row>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-5">
                    <FaFilter size={40} className="text-muted mb-3 opacity-50" />
                    <p className="text-muted">{t.noResults}</p>
                </div>
            ) : (
                <Card className="border-0 shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 admin-table">
                            <thead>
                                <tr>
                                    <th>{t.program}</th>
                                    <th>{t.passenger}</th>
                                    <th><FaCalendarAlt size={12} className="me-1" />{t.date}</th>
                                    <th><FaUsers size={12} className="me-1" />{t.participants}</th>
                                    <th><FaMoneyBillWave size={12} className="me-1" />{t.total}</th>
                                    <th>{t.status}</th>
                                    <th>{t.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((b) => {
                                    const sc = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
                                    const statusLabel = lang === "ar" ? sc.label_ar : sc.label_en;
                                    const isUpdating = updating === b.id;
                                    return (
                                        <tr key={b.id}>
                                            <td className="fw-semibold">{b.programTitle || "—"}</td>
                                            <td>
                                                <div>{b.passengerName || "—"}</div>
                                                <small className="text-muted">{b.phone || ""}</small>
                                            </td>
                                            <td className="text-muted small">{formatDate(b.createdAt)}</td>
                                            <td>{b.participants || 1}</td>
                                            <td className="fw-bold text-primary">{b.totalPrice || 0} {t.egp}</td>
                                            <td>
                                                <Badge bg={sc.color} className="d-flex align-items-center gap-1 px-2 py-1 w-fit">
                                                    {sc.icon}<span>{statusLabel}</span>
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-1">
                                                    {b.status !== "confirmed" && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline-success"
                                                            className="rounded-pill px-2"
                                                            onClick={() => changeStatus(b.id, "confirmed")}
                                                            disabled={isUpdating}
                                                        >
                                                            {isUpdating ? <Spinner as="span" size="sm" /> : <><FaCheckCircle size={11} className="me-1" />{t.confirm}</>}
                                                        </Button>
                                                    )}
                                                    {b.status !== "cancelled" && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            className="rounded-pill px-2"
                                                            onClick={() => changeStatus(b.id, "cancelled")}
                                                            disabled={isUpdating}
                                                        >
                                                            {isUpdating ? <Spinner as="span" size="sm" /> : <><FaTimesCircle size={11} className="me-1" />{t.cancel}</>}
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default AdminBookings;
