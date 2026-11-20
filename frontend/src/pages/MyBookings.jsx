// src/pages/MyBookings.jsx
import { useState } from "react";
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from "react-bootstrap";
import {
    FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaMoneyBillWave,
    FaClipboardList, FaGlobe, FaCheckCircle, FaClock, FaTimesCircle
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useUserBookings } from "../hooks/useBookings";

const translations = {
    ar: {
        title: "حجوزاتي",
        subtitle: "تاريخ رحلاتك المحجوزة",
        noBookings: "لا توجد حجوزات بعد",
        noBookingsSub: "تصفّح برامجنا واحجز رحلتك الأولى!",
        browsePrograms: "تصفّح البرامج",
        program: "البرنامج",
        participants: "المشاركون",
        total: "الإجمالي",
        date: "تاريخ الحجز",
        status: "الحالة",
        statuses: {
            pending: "قيد الانتظار",
            confirmed: "مؤكد",
            cancelled: "ملغي",
        },
        egp: "ج.م",
        lang: "English",
    },
    en: {
        title: "My Bookings",
        subtitle: "Your reservation history",
        noBookings: "No bookings yet",
        noBookingsSub: "Browse our programs and book your first trip!",
        browsePrograms: "Browse Programs",
        program: "Program",
        participants: "Participants",
        total: "Total",
        date: "Booking Date",
        status: "Status",
        statuses: {
            pending: "Pending",
            confirmed: "Confirmed",
            cancelled: "Cancelled",
        },
        egp: "EGP",
        lang: "العربية",
    },
};

const statusConfig = {
    pending: { variant: "warning", icon: <FaClock /> },
    confirmed: { variant: "success", icon: <FaCheckCircle /> },
    cancelled: { variant: "danger", icon: <FaTimesCircle /> },
};

const MyBookings = () => {
    const [lang, setLang] = useState("ar");
    const isRTL = lang === "ar";
    const tr = translations[lang];

    const { currentUser } = useAuth();
    const { bookings, loading, error } = useUserBookings(currentUser?.uid);

    const formatDate = (ts) => {
        if (!ts) return "—";
        const d = ts.toDate ? ts.toDate() : new Date(ts);
        return d.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
            year: "numeric", month: "short", day: "numeric",
        });
    };

    return (
        <div dir={isRTL ? "rtl" : "ltr"} style={{ minHeight: "100vh", background: "#f0f4f8" }}>
            {/* Page Header */}
            <div className="page-header-banner">
                <div className="page-header-overlay" />
                <Container className="position-relative py-5" style={{ zIndex: 2 }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="text-white fw-bold mb-1">
                                <FaClipboardList className="me-2" />
                                {tr.title}
                            </h1>
                            <p className="text-white-50 mb-0">{tr.subtitle}</p>
                        </div>
                        <Button
                            variant="outline-light"
                            size="sm"
                            className="rounded-pill"
                            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                        >
                            <FaGlobe className="me-1" /> {tr.lang}
                        </Button>
                    </div>
                </Container>
            </div>

            <Container className="py-4">
                {error && <Alert variant="danger">{error}</Alert>}

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="empty-state-icon mb-3">
                            <FaCalendarAlt size={56} />
                        </div>
                        <h4 className="fw-bold text-dark">{tr.noBookings}</h4>
                        <p className="text-muted mb-4">{tr.noBookingsSub}</p>
                        <Button href="/programs" className="book-btn rounded-pill px-4 py-2">
                            {tr.browsePrograms}
                        </Button>
                    </div>
                ) : (
                    <Row className="g-4">
                        {bookings.map((booking) => {
                            const sc = statusConfig[booking.status] || statusConfig.pending;
                            const statusLabel = tr.statuses[booking.status] || booking.status;
                            return (
                                <Col key={booking.id} xs={12} md={6} lg={4}>
                                    <Card className="booking-card border-0 shadow-sm h-100">
                                        <div className={`booking-card-accent status-${booking.status}`} />
                                        <Card.Body className="p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <h5 className="fw-bold mb-0 booking-title">{booking.programTitle}</h5>
                                                <Badge bg={sc.variant} className="status-badge d-flex align-items-center gap-1 px-2 py-1">
                                                    {sc.icon}
                                                    <span>{statusLabel}</span>
                                                </Badge>
                                            </div>

                                            <div className="booking-info-grid">
                                                <div className="booking-info-item">
                                                    <FaCalendarAlt className="info-icon" />
                                                    <div>
                                                        <small className="text-muted d-block">{tr.date}</small>
                                                        <span className="fw-semibold">{formatDate(booking.createdAt)}</span>
                                                    </div>
                                                </div>
                                                <div className="booking-info-item">
                                                    <FaUsers className="info-icon" />
                                                    <div>
                                                        <small className="text-muted d-block">{tr.participants}</small>
                                                        <span className="fw-semibold">{booking.participants || 1}</span>
                                                    </div>
                                                </div>
                                                <div className="booking-info-item">
                                                    <FaMoneyBillWave className="info-icon" />
                                                    <div>
                                                        <small className="text-muted d-block">{tr.total}</small>
                                                        <span className="fw-bold text-primary">
                                                            {booking.totalPrice} {tr.egp}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Booking ID */}
                                            <div className="booking-id-tag mt-3">
                                                # {booking.id.slice(0, 8).toUpperCase()}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default MyBookings;
