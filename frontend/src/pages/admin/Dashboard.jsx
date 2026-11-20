// src/pages/admin/AdminDashboard.jsx
import { useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import {
    FaMapMarkedAlt, FaCalendarCheck, FaClock, FaCheckCircle,
    FaTimesCircle, FaChartBar, FaMoneyBillWave
} from "react-icons/fa";
import { usePrograms } from "../../hooks/usePrograms";
import { useAllBookings } from "../../hooks/useBookings";
import { useAuth } from "../../contexts/AuthContext";

const StatCard = ({ icon, value, label, color, bg }) => (
    <Card className="stat-card border-0 shadow-sm h-100">
        <Card.Body className="d-flex align-items-center gap-3 p-4">
            <div className="stat-icon-wrapper" style={{ background: bg, color }}>
                {icon}
            </div>
            <div>
                <div className="stat-value fw-bold">{value}</div>
                <div className="stat-label text-muted small">{label}</div>
            </div>
        </Card.Body>
    </Card>
);

const AdminDashboard = () => {
    const [lang, setLang] = useState("ar");
    const { userProfile } = useAuth();
    const { programs, loading: pLoading } = usePrograms();
    const { bookings, loading: bLoading } = useAllBookings();

    const isRTL = lang === "ar";
    const loading = pLoading || bLoading;

    const stats = {
        totalPrograms: programs.length,
        totalBookings: bookings.length,
        pending: bookings.filter((b) => b.status === "pending").length,
        confirmed: bookings.filter((b) => b.status === "confirmed").length,
        cancelled: bookings.filter((b) => b.status === "cancelled").length,
        revenue: bookings
            .filter((b) => b.status === "confirmed")
            .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
    };

    const tr = {
        ar: {
            welcome: "لوحة التحكم",
            hi: `مرحباً، ${userProfile?.name || "المشرف"}`,
            programs: "البرامج", bookings: "الحجوزات",
            pending: "قيد الانتظار", confirmed: "مؤكدة",
            cancelled: "ملغية", revenue: "الإيرادات (ج.م)",
            recentBookings: "آخر الحجوزات",
            noBookings: "لا توجد حجوزات بعد",
            statuses: { pending: "قيد الانتظار", confirmed: "مؤكد", cancelled: "ملغي" },
        },
        en: {
            welcome: "Dashboard",
            hi: `Hello, ${userProfile?.name || "Admin"}`,
            programs: "Programs", bookings: "Bookings",
            pending: "Pending", confirmed: "Confirmed",
            cancelled: "Cancelled", revenue: "Revenue (EGP)",
            recentBookings: "Recent Bookings",
            noBookings: "No bookings yet",
            statuses: { pending: "Pending", confirmed: "Confirmed", cancelled: "Cancelled" },
        },
    };
    const t = tr[lang] || tr.ar;

    const formatDate = (ts) => {
        if (!ts) return "—";
        const d = ts.toDate ? ts.toDate() : new Date(ts);
        return d.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB");
    };

    const statusBadge = (status) => {
        const map = { pending: "warning", confirmed: "success", cancelled: "danger" };
        return (
            <span className={`badge bg-${map[status] || "secondary"}`}>
                {t.statuses[status] || status}
            </span>
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
        <div dir={isRTL ? "rtl" : "ltr"}>
            {/* Greeting */}
            <div className="admin-greeting mb-4">
                <h4 className="fw-bold mb-0">{t.hi}</h4>
                <p className="text-muted small mb-0">{t.welcome}</p>
            </div>

            {/* Stat Cards */}
            <Row className="g-3 mb-4">
                <Col xs={6} lg={4} xl={2}>
                    <StatCard icon={<FaMapMarkedAlt size={22} />} value={stats.totalPrograms} label={t.programs} color="#4F46E5" bg="#EEF2FF" />
                </Col>
                <Col xs={6} lg={4} xl={2}>
                    <StatCard icon={<FaCalendarCheck size={22} />} value={stats.totalBookings} label={t.bookings} color="#0891B2" bg="#ECFEFF" />
                </Col>
                <Col xs={6} lg={4} xl={2}>
                    <StatCard icon={<FaClock size={22} />} value={stats.pending} label={t.pending} color="#D97706" bg="#FFFBEB" />
                </Col>
                <Col xs={6} lg={4} xl={2}>
                    <StatCard icon={<FaCheckCircle size={22} />} value={stats.confirmed} label={t.confirmed} color="#059669" bg="#ECFDF5" />
                </Col>
                <Col xs={6} lg={4} xl={2}>
                    <StatCard icon={<FaTimesCircle size={22} />} value={stats.cancelled} label={t.cancelled} color="#DC2626" bg="#FEF2F2" />
                </Col>
                <Col xs={6} lg={4} xl={2}>
                    <StatCard icon={<FaMoneyBillWave size={22} />} value={stats.revenue.toLocaleString()} label={t.revenue} color="#7C3AED" bg="#F5F3FF" />
                </Col>
            </Row>

            {/* Recent Bookings Table */}
            <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-0 pt-4 pb-2 px-4">
                    <h6 className="fw-bold mb-0">
                        <FaChartBar className="me-2 text-primary" />
                        {t.recentBookings}
                    </h6>
                </Card.Header>
                <Card.Body className="p-0">
                    {bookings.length === 0 ? (
                        <p className="text-muted text-center py-4">{t.noBookings}</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover mb-0 admin-table">
                                <thead>
                                    <tr>
                                        <th>{lang === "ar" ? "البرنامج" : "Program"}</th>
                                        <th>{lang === "ar" ? "المستخدم" : "User"}</th>
                                        <th>{lang === "ar" ? "التاريخ" : "Date"}</th>
                                        <th>{lang === "ar" ? "الإجمالي" : "Total"}</th>
                                        <th>{lang === "ar" ? "الحالة" : "Status"}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.slice(0, 10).map((b) => (
                                        <tr key={b.id}>
                                            <td className="fw-semibold">{b.programTitle || "—"}</td>
                                            <td className="text-muted small">{b.userId?.slice(0, 8)}...</td>
                                            <td className="text-muted small">{formatDate(b.createdAt)}</td>
                                            <td className="fw-semibold text-primary">{b.totalPrice || 0} {lang === "ar" ? "ج.م" : "EGP"}</td>
                                            <td>{statusBadge(b.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminDashboard;
