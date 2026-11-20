import { useState, useEffect, useRef } from "react";
import PublicLayout from "../Layouts/PublicLayout";
import gsap from "gsap";
import {
    Container, Row, Col, Form, Button, Modal, Spinner,
    Alert, Badge, FloatingLabel
} from "react-bootstrap";
import {
    FaSearch, FaGlobe, FaMapMarkerAlt, FaCheck, FaTimes,
    FaCalendarCheck, FaUser, FaPhone, FaUsers, FaFilter,
    FaClock, FaImages, FaTag, FaArrowRight,
} from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { usePage, router } from "@inertiajs/react";
import Seo from "../Components/Seo";
import ProgramCard from "../Components/ProgramCard";

const tr = {
    hero: "Our Tour Programs",
    heroSub: "Discover Egypt with our best curated tour programs – an unforgettable experience",
    search: "Search programs...",
    filterDuration: "Filter by duration",
    allDurations: "All durations",
    short: "Short (1-3 days)",
    medium: "Medium (4-7 days)",
    long: "Long (8+ days)",
    noResults: "No programs match your search",
    bookingTitle: "Confirm Booking",
    name: "Full Name",
    phone: "Phone Number",
    passengers: "Number of Passengers",
    totalPrice: "Total Price",
    usd: "USD",
    confirm: "Confirm Booking",
    cancel: "Cancel",
    confirming: "Processing...",
    success: "Booking confirmed! We will contact you soon.",
    loginRequired: "Please sign in first to complete booking",
    programs: "programs",
    found: "available",
    filters: "Filters",
};

const Programs = () => {
    const lang = "en";

    const { programs = [], auth } = usePage().props;
    const currentUser = auth?.user || null;
    const loading = false;
    const error = null;

    const gridRef = useRef();
    const filterRef = useRef();

    // Entrance animation on mount
    useEffect(() => {
        if (filterRef.current) {
            gsap.fromTo(filterRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
        }
    }, []);

    // Cards stagger when programs load
    useEffect(() => {
        if (!loading && programs.length > 0 && gridRef.current) {
            const cards = gridRef.current.querySelectorAll(".program-card-anim");
            if (cards.length > 0) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }
                );
            }
        }
    }, [loading, programs]);

    const [search, setSearch] = useState("");
    const [durationFilter, setDurationFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [bookingForm, setBookingForm] = useState({ name: "", phone: "", passengers: 1 });
    const [submitting, setSubmitting] = useState(false);
    const [notification, setNotification] = useState(null);
    const [detailProgram, setDetailProgram] = useState(null);

    const filtered = programs.filter((p) => {
        const title = (typeof p.title === "object" && p.title !== null) ? p.title[lang] || p.title.ar || p.title.en : p.title || "";
        const matchSearch = title.toLowerCase().includes(search.toLowerCase());
        let matchDuration = true;
        if (durationFilter === "short") matchDuration = p.duration >= 1 && p.duration <= 3;
        if (durationFilter === "medium") matchDuration = p.duration >= 4 && p.duration <= 7;
        if (durationFilter === "long") matchDuration = p.duration >= 8;
        return matchSearch && matchDuration;
    });

    console.log("Programs loading status:", loading);
    console.log("Total programs loaded:", programs.length);
    console.log("Filtered programs length:", filtered.length);

    const openBooking = (program) => {
        if (!currentUser) {
            router.visit('/register');
            return;
        }
        setSelectedProgram(program);
        setBookingForm({ name: currentUser.name || currentUser.displayName || "", phone: "", passengers: 1 });
        setShowModal(true);
    };

    const finalPrice = () => {
        if (!selectedProgram) return 0;
        const hasDiscount = selectedProgram.discount > 0;
        const pricePerPerson = hasDiscount
            ? Math.round(selectedProgram.price * (1 - selectedProgram.discount / 100))
            : selectedProgram.price;
        return pricePerPerson * bookingForm.passengers;
    };

    const handleConfirmBooking = async () => {
        if (!bookingForm.name || !bookingForm.phone) return;
        setSubmitting(true);
        try {
            const title =
                (typeof selectedProgram.title === "object" && selectedProgram.title !== null)
                    ? selectedProgram.title[lang] || selectedProgram.title.ar || selectedProgram.title.en
                    : selectedProgram.title;
            router.post('/bookings', {
                program_id: selectedProgram.id,
                program_title: title,
                participants: bookingForm.passengers,
                total_price: finalPrice(),
                passenger_name: bookingForm.name,
                phone: bookingForm.phone,
            }, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                    showNotification(tr.success, "success");
                    setSubmitting(false);
                },
                onError: (errors) => {
                    console.error("Booking error", errors);
                    showNotification("An error occurred. Please try again.", "danger");
                    setSubmitting(false);
                }
            });
        } catch (err) {
            showNotification("An error occurred. Please try again.", "danger");
            setSubmitting(false);
        }
    };

    const showNotification = (msg, type) => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 5000);
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
                    <p className="mt-3 text-muted">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: "#f0f4f8" }}>
            <Seo 
                title="Egypt Tourism | Programs" 
                description="Explore our best curated tour programs in Egypt. From Cairo to Luxor, experience history and beauty."
                keywords="Egypt tours, Cairo sightseeing, Luxor Nile cruise, travel programs Egypt"
            />
            {/* Notification */}
            {notification && (
                <Alert
                    variant={notification.type}
                    className="position-fixed top-0 end-0 m-3 shadow-lg"
                    style={{ zIndex: 9999, minWidth: 300, borderRadius: 12 }}
                    onClose={() => setNotification(null)}
                    dismissible
                >
                    {notification.msg}
                </Alert>
            )}


            {/* Filters */}
            <Container className="py-4" ref={filterRef}>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="filters-bar d-flex flex-wrap gap-3 align-items-center mb-4">
                    <div className="search-wrapper flex-grow-1">
                        <FaSearch className="search-icon" />
                        <Form.Control
                            type="text"
                            placeholder={tr.search}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                            style={{ paddingInlineStart: "2.5rem" }}
                        />
                    </div>
                    <Form.Select
                        value={durationFilter}
                        onChange={(e) => setDurationFilter(e.target.value)}
                        className="filter-select"
                        style={{ maxWidth: 200 }}
                    >
                        <option value="all">{tr.allDurations}</option>
                        <option value="short">{tr.short}</option>
                        <option value="medium">{tr.medium}</option>
                        <option value="long">{tr.long}</option>
                    </Form.Select>
                </div>

                {/* Programs Grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-5">
                        <FaSearch size={48} className="text-muted mb-3 opacity-50" />
                        <h5 className="text-muted">{tr.noResults}</h5>
                    </div>
                ) : (
                    <Row className="g-4" ref={gridRef}>
                        {filtered.map((program) => (
                            <Col key={program.id} xs={12} sm={6} lg={4} xl={3} className="program-card-anim">
                                <ProgramCard
                                    program={program}
                                    lang={lang}
                                    onBook={openBooking}
                                    isAuthenticated={!!currentUser}
                                    onClick={(p) => setDetailProgram(p)}
                                />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>

            {/* Booking Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton className="border-0 booking-modal-header">
                    <Modal.Title className="text-white">
                        <FaCalendarCheck className="me-2" />
                        {tr.bookingTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {selectedProgram && (
                        <Row className="g-4">
                            <Col md={5}>
                                {selectedProgram.images?.[0] && (
                                    <img
                                        src={selectedProgram.images[0]}
                                        alt=""
                                        className="w-100 rounded-3 mb-3"
                                        style={{ height: 160, objectFit: "cover" }}
                                    />
                                )}
                                <h5 className="fw-bold">
                                    {typeof selectedProgram.title === "object" && selectedProgram.title !== null
                                        ? selectedProgram.title[lang] || selectedProgram.title.ar
                                        : selectedProgram.title}
                                </h5>
                                {selectedProgram.locations?.slice(0, 3).map((loc, i) => (
                                    <Badge key={i} className="location-badge me-1 mb-1">
                                        <FaMapMarkerAlt size={9} className="me-1" />
                                        {typeof loc === "object" && loc !== null ? loc[lang] || loc.ar || loc.en : loc}
                                    </Badge>
                                ))}
                            </Col>
                            <Col md={7}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <div className="input-icon-wrapper">
                                            <FaUser className="input-icon" />
                                            <Form.Control
                                                type="text"
                                                placeholder={tr.name}
                                                value={bookingForm.name}
                                                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                                className="auth-input"
                                                style={{ paddingInlineStart: "2.5rem" }}
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <PhoneInput
                                            international
                                            defaultCountry="EG"
                                            value={bookingForm.phone}
                                            onChange={(val) => setBookingForm({ ...bookingForm, phone: val || "" })}
                                            className="phone-input-wrapper"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <div className="input-icon-wrapper">
                                            <FaUsers className="input-icon" />
                                            <Form.Control
                                                type="number"
                                                min={1}
                                                max={50}
                                                value={bookingForm.passengers}
                                                onChange={(e) => setBookingForm({ ...bookingForm, passengers: parseInt(e.target.value) || 1 })}
                                                className="auth-input"
                                                style={{ paddingInlineStart: "2.5rem" }}
                                            />
                                        </div>
                                    </Form.Group>
                                    <div className="price-summary-box mb-3">
                                        <span>{tr.totalPrice}</span>
                                        <strong className="text-primary fs-5">{finalPrice()} {tr.usd}</strong>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="light" onClick={() => setShowModal(false)} className="rounded-pill px-4">
                        <FaTimes className="me-1" /> {tr.cancel}
                    </Button>
                    <Button
                        className="book-btn rounded-pill px-4"
                        onClick={handleConfirmBooking}
                        disabled={submitting || !bookingForm.name || !bookingForm.phone}
                    >
                        {submitting
                            ? <><Spinner as="span" size="sm" className="me-2" />{tr.confirming}</>
                            : <><FaCheck className="me-2" />{tr.confirm}</>}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Program Detail Modal */}
            <Modal
                show={!!detailProgram}
                onHide={() => setDetailProgram(null)}
                size="lg"
                centered
            >
                {detailProgram && (() => {
                    const p = detailProgram;
                    const title = (typeof p.title === "object" && p.title !== null) ? p.title[lang] || p.title.ar || p.title.en : p.title;
                    const description = (typeof p.description === "object" && p.description !== null) ? p.description[lang] || p.description.ar || p.description.en : p.description;
                    const hasDiscount = p.discount && p.discount > 0;
                    const discountedPrice = hasDiscount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
                    const images = p.images?.length ? p.images : [];

                    return (
                        <>
                            <Modal.Header closeButton style={{ border: "none", padding: "16px 24px 0" }}>
                                <Modal.Title className="fw-bold" style={{ color: "#1E293B" }}>{title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="px-4 pb-4">
                                {/* Image gallery */}
                                {images.length > 0 ? (
                                    <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                                        <img
                                            src={images[0]}
                                            alt={title}
                                            style={{ width: "100%", height: 300, objectFit: "cover" }}
                                            onError={(e) => { e.target.style.display = "none"; }}
                                        />
                                        {images.length > 1 && (
                                            <div className="d-flex gap-2 mt-2" style={{ overflowX: "auto" }}>
                                                {images.slice(1, 5).map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={img}
                                                        alt={`${title} ${i + 2}`}
                                                        style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                                                        onError={(e) => { e.target.style.display = "none"; }}
                                                    />
                                                ))}
                                                {images.length > 5 && (
                                                    <div className="d-flex align-items-center justify-content-center" style={{ width: 100, height: 70, borderRadius: 8, background: "#E2E8F0", flexShrink: 0, color: "#64748B", fontWeight: 600 }}>
                                                        <FaImages className="me-1" /> +{images.length - 5}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center mb-3" style={{ height: 200, background: "#F1F5F9", borderRadius: 12 }}>
                                        <FaImages size={48} style={{ color: "#CBD5E1" }} />
                                    </div>
                                )}

                                {/* Description */}
                                <p style={{ color: "#475569", lineHeight: 1.7, fontSize: ".95rem" }}>
                                    {description}
                                </p>

                                {/* Meta badges */}
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    {p.duration && (
                                        <Badge bg="light" text="dark" className="d-flex align-items-center gap-1 px-3 py-2" style={{ fontSize: ".85rem" }}>
                                            <FaClock size={13} style={{ color: "#6366F1" }} /> {p.duration} days
                                        </Badge>
                                    )}
                                    {p.locations?.length > 0 && (
                                        <Badge bg="light" text="dark" className="d-flex align-items-center gap-1 px-3 py-2" style={{ fontSize: ".85rem" }}>
                                            <FaMapMarkerAlt size={13} style={{ color: "#10B981" }} /> {p.locations.length} locations
                                        </Badge>
                                    )}
                                    {hasDiscount && (
                                        <Badge bg="danger" className="d-flex align-items-center gap-1 px-3 py-2" style={{ fontSize: ".85rem" }}>
                                            <FaTag size={13} /> {p.discount}% OFF
                                        </Badge>
                                    )}
                                </div>

                                {/* Locations list */}
                                {p.locations?.length > 0 && (
                                    <div className="mb-3">
                                        <h6 className="fw-bold mb-2" style={{ color: "#1E293B" }}>Destinations</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {p.locations.map((loc, i) => {
                                                const locName = (typeof loc === "object" && loc !== null) ? loc[lang] || loc.ar || loc.en : loc;
                                                return (
                                                    <Badge key={i} bg="light" text="dark" className="px-3 py-2" style={{ border: "1px solid #E2E8F0" }}>
                                                        <FaMapMarkerAlt size={10} className="me-1" style={{ color: "#6366F1" }} />
                                                        {locName}
                                                    </Badge>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Price + Book button */}
                                <div className="d-flex align-items-center justify-content-between p-3 mt-3" style={{ background: "#F8FAFC", borderRadius: 12 }}>
                                    <div>
                                        <div className="text-muted small">Price per person</div>
                                        <div className="d-flex align-items-center gap-2">
                                            {hasDiscount && (
                                                <span className="text-muted text-decoration-line-through" style={{ fontSize: ".9rem" }}>
                                                    {p.price} USD
                                                </span>
                                            )}
                                            <span className="fw-bold" style={{ fontSize: "1.4rem", color: "#6366F1" }}>
                                                {discountedPrice} USD
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        className="rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
                                        style={{ background: "linear-gradient(135deg, var(--c-primary), var(--c-secondary))", border: "none" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDetailProgram(null);
                                            openBooking(p);
                                        }}
                                    >
                                        <FaCalendarCheck size={14} /> Book Now
                                    </Button>
                                </div>
                            </Modal.Body>
                        </>
                    );
                })()}
            </Modal>
        </div>
    );
};

Programs.layout = page => <PublicLayout>{page}</PublicLayout>;

export default Programs;
