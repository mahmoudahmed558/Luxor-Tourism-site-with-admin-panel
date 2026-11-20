// src/pages/NotFound.jsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { FaHome, FaSearch } from "react-icons/fa";
import gsap from "gsap";

const NotFound = () => {
    const containerRef = useRef();
    const numberRef = useRef();
    const textRef = useRef();
    const btnRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
            .fromTo(numberRef.current, { opacity: 0, scale: 0.5, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.4)" }, "-=0.2")
            .fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
            .fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");

        // Floating animation on the 404 number
        gsap.to(numberRef.current, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                opacity: 0,
                background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Background decorative elements */}
            <div style={{
                position: "absolute", top: "10%", left: "5%", width: "300px", height: "300px",
                borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
                filter: "blur(40px)", pointerEvents: "none"
            }} />
            <div style={{
                position: "absolute", bottom: "15%", right: "10%", width: "250px", height: "250px",
                borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
                filter: "blur(40px)", pointerEvents: "none"
            }} />

            <Container className="text-center" style={{ maxWidth: 540, position: "relative", zIndex: 1 }}>
                {/* 404 Number */}
                <div ref={numberRef} style={{ opacity: 0 }}>
                    <h1 className="fw-bold mb-0" style={{
                        fontSize: "clamp(100px, 20vw, 180px)",
                        background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 30%, #10B981 70%, #06B6D4 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        lineHeight: 1,
                        letterSpacing: "-4px",
                        textShadow: "none",
                        filter: "drop-shadow(0 0 40px rgba(99,102,241,0.3))",
                    }}>
                        404
                    </h1>
                </div>

                {/* Text */}
                <div ref={textRef} style={{ opacity: 0 }}>
                    <h2 className="fw-bold text-white mb-3" style={{ fontSize: "1.75rem" }}>
                        Page Not Found
                    </h2>
                    <p className="mb-4" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        <br />Let&apos;s get you back on track.
                    </p>
                </div>

                {/* Buttons */}
                <div ref={btnRef} className="d-flex justify-content-center gap-3 flex-wrap" style={{ opacity: 0 }}>
                    <Button
                        as={Link}
                        to="/"
                        size="lg"
                        className="rounded-pill px-4 d-flex align-items-center gap-2"
                        style={{
                            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                            border: "none",
                            boxShadow: "0 8px 25px rgba(99,102,241,0.35)",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 30px rgba(99,102,241,0.45)"; }}
                        onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 25px rgba(99,102,241,0.35)"; }}
                    >
                        <FaHome size={16} />
                        Go Home
                    </Button>
                    <Button
                        as={Link}
                        to="/programs"
                        variant="outline-light"
                        size="lg"
                        className="rounded-pill px-4 d-flex align-items-center gap-2"
                        style={{
                            borderColor: "rgba(255,255,255,0.2)",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.5)"; e.target.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.transform = "translateY(0)"; }}
                    >
                        <FaSearch size={14} />
                        Browse Programs
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default NotFound;
