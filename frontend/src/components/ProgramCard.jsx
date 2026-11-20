// src/components/ProgramCard.jsx
import { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import {
    FaMapMarkerAlt, FaClock, FaTag, FaImages, FaCalendarPlus,
} from "react-icons/fa";

const ProgramCard = ({ program, lang = "ar", onBook, isAuthenticated, onClick }) => {
    const [imgIndex, setImgIndex] = useState(0);
    const isRTL = lang === "ar";

    const title =
        typeof program.title === "object"
            ? program.title[lang] || program.title.ar || program.title.en
            : program.title;

    const description =
        typeof program.description === "object"
            ? program.description[lang] || program.description.ar || program.description.en
            : program.description;

    const hasDiscount = program.discount && program.discount > 0;
    const finalPrice = hasDiscount
        ? Math.round(program.price * (1 - program.discount / 100))
        : program.price;

    const images = program.images?.length ? program.images : [];
    const coverImage = images[imgIndex] || null;

    const labels = {
        ar: {
            duration: "المدة",
            days: "يوم",
            locations: "المواقع",
            bookNow: "احجز الآن",
            loginToBook: "سجّل دخولك للحجز",
            discount: "خصم",
            egp: "ج.م",
            photos: "صور",
        },
        en: {
            duration: "Duration",
            days: "days",
            locations: "Locations",
            bookNow: "Book Now",
            loginToBook: "Login to Book",
            discount: "OFF",
            egp: "EGP",
            photos: "photos",
        },
    };
    const lb = labels[lang] || labels.en;

    return (
        <Card
            className="program-card h-100 border-0 shadow-sm hover-grow"
            dir={isRTL ? "rtl" : "ltr"}
            style={{ borderRadius: "16px", overflow: "hidden", cursor: onClick ? "pointer" : "default" }}
            onClick={() => onClick && onClick(program)}
        >
            {/* Image Carousel Area */}
            <div className="program-card-img-wrapper position-relative" style={{ height: "220px" }}>
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={title}
                        className="program-card-img"
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                ) : (
                    <div className="program-card-img-placeholder d-flex align-items-center justify-content-center h-100 bg-light">
                        <FaImages size={48} className="text-muted opacity-25" />
                    </div>
                )}

                {/* Discount Badge */}
                {hasDiscount && (
                    <div className="discount-badge" style={{ padding: "0.35rem 0.75rem", borderRadius: "8px", background: "var(--c-danger)" }}>
                        <span className="fw-bold fs-6">{program.discount}%</span>
                        <span className="d-block text-uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.5px" }}>
                            {lb.discount}
                        </span>
                    </div>
                )}

                {/* Multi-image thumbnails */}
                {images.length > 1 && (
                    <div className="img-dots-wrapper" style={{ bottom: "12px" }}>
                        {images.slice(0, 5).map((_, i) => (
                            <button
                                key={i}
                                className={`img-dot ${i === imgIndex ? "active" : ""}`}
                                onClick={() => setImgIndex(i)}
                                aria-label={`Image ${i + 1}`}
                            />
                        ))}
                        {images.length > 5 && (
                            <span className="img-dot-extra fw-bold">+{images.length - 5}</span>
                        )}
                    </div>
                )}
            </div>

            <Card.Body className="p-4 d-flex flex-column">
                <h5 className="program-title mb-2 fw-bold text-dark">{title}</h5>
                <p className="text-muted small mb-3 program-description flex-grow-1" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                    {description}
                </p>

                {/* Meta Row */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                    {program.duration && (
                        <span className="program-meta-tag shadow-sm">
                            <FaClock size={12} className="me-1 text-primary" />
                            {program.duration} {lb.days}
                        </span>
                    )}
                    {program.locations?.length > 0 && (
                        <span className="program-meta-tag shadow-sm">
                            <FaMapMarkerAlt size={12} className="me-1 text-primary" />
                            {program.locations.length} {lb.locations}
                        </span>
                    )}
                </div>

                {/* Price Row */}
                <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-light">
                    <div>
                        {hasDiscount && (
                            <div className="text-muted text-decoration-line-through small" style={{ fontSize: "0.8rem" }}>
                                {program.price} {lb.egp}
                            </div>
                        )}
                        <span className="program-price fw-bold text-primary fs-5">
                            {finalPrice} {lb.egp}
                        </span>
                    </div>
                </div>

                {/* Book Button */}
                <Button
                    className="book-btn w-100 rounded-pill py-2 fw-bold shadow-sm hover-grow mt-auto"
                    onClick={() => onBook && onBook(program)}
                    disabled={!isAuthenticated}
                    title={!isAuthenticated ? lb.loginToBook : ""}
                    style={{ background: "linear-gradient(135deg, var(--c-primary), var(--c-secondary))", border: "none" }}
                >
                    <FaCalendarPlus className="me-2" />
                    {isAuthenticated ? lb.bookNow : lb.loginToBook}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProgramCard;
