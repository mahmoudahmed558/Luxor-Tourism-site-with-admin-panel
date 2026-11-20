import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Modal, Badge } from "react-bootstrap";
import {
  FaStar,
  FaUsers,
  FaShieldAlt,
  FaHeadset,
  FaRoute,
  FaArrowRight,
  FaQuoteLeft,
  FaMapMarkerAlt,
  FaClock,
  FaImages,
  FaTag,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { usePrograms } from "../hooks/usePrograms";
import ProgramCard from "../components/ProgramCard";

/* ─── animated counter ─── */
const AnimatedCounter = ({ end, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const num = { val: 0 };
          gsap.to(num, {
            val: end,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent =
                Math.floor(num.val).toLocaleString() + suffix;
            },
          });
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
};

/* ─── stats ─── */
const stats = [
  { value: 10000, suffix: "+", label: "Happy Travelers", color: "#6366F1" },
  { value: 50, suffix: "+", label: "Tour Packages", color: "#10B981" },
  { value: 15, suffix: "+", label: "Years Experience", color: "#F59E0B" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", color: "#EC4899" },
];

/* ─── features ─── */
const features = [
  {
    icon: FaUsers,
    title: "Expert Guides",
    description:
      "Certified Egyptologists and local guides who bring history to life",
    color: "#6366F1",
  },
  {
    icon: FaShieldAlt,
    title: "Safe & Reliable",
    description:
      "Modern vehicles, comprehensive insurance, and 24/7 roadside assistance",
    color: "#10B981",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support throughout your entire journey",
    color: "#F59E0B",
  },
  {
    icon: FaRoute,
    title: "Custom Itineraries",
    description:
      "Tailored tours designed around your interests and schedule",
    color: "#EC4899",
  },
];

/* ─── testimonials ─── */
const testimonials = [
  {
    name: "Sarah Johnson",
    country: "United States",
    text: "An unforgettable experience! The Pyramids tour was perfectly organized. Our guide was incredibly knowledgeable and the vehicle was very comfortable.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Marco Rossi",
    country: "Italy",
    text: "Best tourism company in Egypt! From Luxor to Aswan, every detail was taken care of. Highly recommend their Nile cruise package.",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Yuki Tanaka",
    country: "Japan",
    text: "The Red Sea diving trip exceeded all expectations. Crystal-clear waters and amazing coral reefs. Will definitely book again!",
    rating: 4,
    avatar: "YT",
  },
];

/* ════════════════════════════════════════════ */
const HomePage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { programs, loading } = usePrograms();
  const [selectedProgram, setSelectedProgram] = useState(null);

  /* hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-anim") || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  /* top 3 programs */
  const featuredPrograms = programs.slice(0, 3);

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          background:
            "url(https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1600&h=900&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(15,23,42,.88) 0%, rgba(30,58,95,.7) 100%)",
          }}
        />

        {/* decorative blurs */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <Container style={{ position: "relative", zIndex: 1 }}>
          <Row className="align-items-center justify-content-center text-center">
            <Col lg={8}>
              <p
                className="hero-anim text-uppercase fw-bold mb-2"
                style={{
                  color: "#10B981",
                  letterSpacing: 3,
                  fontSize: ".85rem",
                  opacity: 0,
                }}
              >
                ✦ Egypt&apos;s Premier Tourism Company
              </p>
              <h1
                className="hero-anim display-3 fw-bold text-white mb-3"
                style={{ lineHeight: 1.15, opacity: 0 }}
              >
                Discover Egypt&apos;s{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#6366F1,#10B981)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Timeless Wonders
                </span>
              </h1>
              <p
                className="hero-anim lead mb-4 mx-auto"
                style={{
                  color: "rgba(255,255,255,.7)",
                  fontSize: "1.15rem",
                  maxWidth: 580,
                  opacity: 0,
                }}
              >
                From the majestic Pyramids to the serene Nile, we craft
                unforgettable journeys through 5,000 years of history.
              </p>
              <div
                className="hero-anim d-flex gap-3 justify-content-center flex-wrap"
                style={{ opacity: 0 }}
              >
                <Button
                  size="lg"
                  className="rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                    border: "none",
                    boxShadow: "0 8px 30px rgba(99,102,241,.35)",
                    transition: "all .3s",
                  }}
                  onClick={() => navigate("/programs")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 35px rgba(99,102,241,.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 30px rgba(99,102,241,.35)";
                  }}
                >
                  Explore Programs <FaArrowRight size={14} />
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  className="rounded-pill px-4 fw-semibold"
                  style={{
                    borderColor: "rgba(255,255,255,.25)",
                    transition: "all .3s",
                  }}
                  onClick={() => navigate("/contact")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.6)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.25)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ═══════════ ANIMATED STATS ═══════════ */}
      <section
        style={{
          background: "linear-gradient(135deg,#0F172A,#1E293B)",
          padding: "60px 0",
        }}
      >
        <Container>
          <Row>
            {stats.map((stat, i) => (
              <Col xs={6} md={3} key={i} className="text-center mb-3">
                <div
                  className="fw-bold text-white"
                  style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}
                >
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    color: stat.color,
                    fontSize: ".9rem",
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ═══════════ FEATURED PROGRAMS ═══════════ */}
      <section style={{ background: "#F8FAFC", padding: "80px 0" }}>
        <Container>
          <div className="text-center mb-5">
            <p
              className="text-uppercase fw-bold mb-1"
              style={{ color: "#6366F1", letterSpacing: 2, fontSize: ".8rem" }}
            >
              Our Programs
            </p>
            <h2 className="display-6 fw-bold" style={{ color: "#1E293B" }}>
              Featured Tour Packages
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: 500 }}>
              Handpicked experiences crafted to showcase the best of Egypt
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading programs...</p>
            </div>
          ) : featuredPrograms.length > 0 ? (
            <>
              <Row className="g-4">
                {featuredPrograms.map((program) => (
                  <Col md={6} lg={4} key={program.id} className="program-card-anim">
                    <ProgramCard
                      program={program}
                      lang="en"
                      isAuthenticated={false}
                      onClick={(p) => setSelectedProgram(p)}
                    />
                  </Col>
                ))}
              </Row>
              <div className="text-center mt-5">
                <Button
                  size="lg"
                  className="rounded-pill px-5 fw-semibold d-inline-flex align-items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                    border: "none",
                    boxShadow: "0 6px 25px rgba(99,102,241,.3)",
                    transition: "all .3s",
                  }}
                  onClick={() => navigate("/programs")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  View All Programs <FaArrowRight size={14} />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">No programs available yet.</p>
            </div>
          )}
        </Container>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section style={{ background: "#fff", padding: "80px 0" }}>
        <Container>
          <div className="text-center mb-5">
            <p
              className="text-uppercase fw-bold mb-1"
              style={{ color: "#F59E0B", letterSpacing: 2, fontSize: ".8rem" }}
            >
              Why Choose Us
            </p>
            <h2 className="display-6 fw-bold" style={{ color: "#1E293B" }}>
              Your Journey, Our Priority
            </h2>
          </div>
          <Row className="g-4">
            {features.map((feat, i) => (
              <Col md={6} lg={3} key={i}>
                <Card
                  className="h-100 border-0 text-center p-4"
                  style={{
                    borderRadius: 16,
                    background: "#F8FAFC",
                    transition: "all .3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(0,0,0,.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: `${feat.color}18`,
                    }}
                  >
                    <feat.icon size={26} style={{ color: feat.color }} />
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: "#1E293B" }}>
                    {feat.title}
                  </h5>
                  <p className="text-muted small mb-0">{feat.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section
        style={{
          background: "linear-gradient(135deg,#0F172A,#1E293B)",
          padding: "80px 0",
        }}
      >
        <Container>
          <div className="text-center mb-5">
            <p
              className="text-uppercase fw-bold mb-1"
              style={{ color: "#EC4899", letterSpacing: 2, fontSize: ".8rem" }}
            >
              Testimonials
            </p>
            <h2 className="display-6 fw-bold text-white">
              What Our Travelers Say
            </h2>
          </div>
          <Row className="g-4">
            {testimonials.map((review, i) => (
              <Col md={4} key={i}>
                <Card
                  className="h-100 border-0 p-4"
                  style={{
                    borderRadius: 16,
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.08)",
                    transition: "all .3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.background = "rgba(255,255,255,.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255,255,255,.06)";
                  }}
                >
                  <div className="mb-3">
                    <FaQuoteLeft
                      size={24}
                      style={{ color: "rgba(255,255,255,.15)" }}
                    />
                  </div>
                  <p
                    className="mb-3"
                    style={{
                      color: "rgba(255,255,255,.75)",
                      lineHeight: 1.7,
                      fontSize: ".95rem",
                    }}
                  >
                    {review.text}
                  </p>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <FaStar
                        key={j}
                        size={14}
                        style={{
                          color:
                            j < review.rating
                              ? "#F59E0B"
                              : "rgba(255,255,255,.15)",
                        }}
                      />
                    ))}
                  </div>
                  <div
                    className="d-flex align-items-center gap-3 mt-auto pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center fw-bold text-white"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                        fontSize: ".85rem",
                      }}
                    >
                      {review.avatar}
                    </div>
                    <div>
                      <div
                        className="fw-bold text-white"
                        style={{ fontSize: ".9rem" }}
                      >
                        {review.name}
                      </div>
                      <div style={{ color: "rgba(255,255,255,.5)", fontSize: ".8rem" }}>
                        {review.country}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section
        style={{
          background:
            "linear-gradient(135deg,#6366F1 0%,#8B5CF6 50%,#A78BFA 100%)",
          padding: "70px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,.08)",
            pointerEvents: "none",
          }}
        />
        <Container
          className="text-center"
          style={{ position: "relative", zIndex: 1 }}
        >
          <h2 className="display-5 fw-bold text-white mb-3">
            Start Your Egyptian Adventure
          </h2>
          <p
            className="lead mb-4 mx-auto"
            style={{ color: "rgba(255,255,255,.85)", maxWidth: 550 }}
          >
            Join thousands of happy travelers who explored Egypt with us.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button
              size="lg"
              className="rounded-pill px-5 fw-bold d-flex align-items-center gap-2"
              style={{
                background: "#fff",
                color: "#6366F1",
                border: "none",
                boxShadow: "0 8px 30px rgba(0,0,0,.15)",
                transition: "all .3s",
              }}
              onClick={() => navigate("/programs")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              Browse Programs <FaArrowRight size={14} />
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              className="rounded-pill px-5 fw-bold"
              style={{
                borderColor: "rgba(255,255,255,.4)",
                transition: "all .3s",
              }}
              onClick={() => navigate("/contact")}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#fff";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get in Touch
            </Button>
          </div>
        </Container>
      </section>
      {/* ═══════════ PROGRAM DETAIL MODAL ═══════════ */}
      <Modal
        show={!!selectedProgram}
        onHide={() => setSelectedProgram(null)}
        size="lg"
        centered
        className="program-detail-modal"
      >
        {selectedProgram && (() => {
          const p = selectedProgram;
          const title = typeof p.title === "object" ? p.title.en || p.title.ar : p.title;
          const description = typeof p.description === "object" ? p.description.en || p.description.ar : p.description;
          const hasDiscount = p.discount && p.discount > 0;
          const finalPrice = hasDiscount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
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
                            style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 8, cursor: "pointer", flexShrink: 0 }}
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
                        const locName = typeof loc === "object" ? loc.en || loc.ar : loc;
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

                {/* Price */}
                <div className="d-flex align-items-center justify-content-between p-3 mt-3" style={{ background: "#F8FAFC", borderRadius: 12 }}>
                  <div>
                    <div className="text-muted small">Price per person</div>
                    <div className="d-flex align-items-center gap-2">
                      {hasDiscount && (
                        <span className="text-muted text-decoration-line-through" style={{ fontSize: ".9rem" }}>
                          {p.price} EGP
                        </span>
                      )}
                      <span className="fw-bold" style={{ fontSize: "1.4rem", color: "#6366F1" }}>
                        {finalPrice} EGP
                      </span>
                    </div>
                  </div>
                  <Button
                    className="rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
                    style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", border: "none" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedProgram(null); navigate("/programs"); }}
                  >
                    View All Programs <FaArrowRight size={13} />
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

export default HomePage;
