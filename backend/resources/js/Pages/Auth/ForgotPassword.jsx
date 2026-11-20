// src/pages/auth/ForgotPassword.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import { Container, Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import { FaEnvelope, FaKey, FaArrowLeft } from "react-icons/fa";
import gsap from "gsap";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const bgRef = useRef();
    const cardRef = useRef();
    const iconRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
            .fromTo(cardRef.current, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, "-=0.3")
            .fromTo(iconRef.current, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // Simulate password reset email
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSent(true);
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={bgRef}
            className="min-vh-100 d-flex align-items-center justify-content-center auth-bg"
            style={{ opacity: 0 }}>
            <Container style={{ maxWidth: 440 }}>
                <Card ref={cardRef} className="border-0 shadow-lg auth-card" style={{ opacity: 0 }}>
                    <Card.Body className="p-4 p-md-5">
                        <div className="text-center mb-4">
                            <div ref={iconRef} className="auth-icon-wrapper mb-3" style={{ opacity: 0 }}>
                                <FaKey size={28} />
                            </div>
                            <h2 className="fw-bold text-dark mb-1">Reset Password</h2>
                            <p className="text-muted small">
                                {sent
                                    ? "Check your inbox for the reset link"
                                    : "Enter your email and we'll send you a reset link"}
                            </p>
                        </div>

                        {error && (
                            <Alert variant="danger" className="rounded-3 py-2 small">
                                {error}
                            </Alert>
                        )}

                        {sent ? (
                            <div className="text-center">
                                <Alert variant="success" className="rounded-3 py-3">
                                    <FaEnvelope className="me-2" />
                                    A password reset link has been sent to <strong>{email}</strong>
                                </Alert>
                                <p className="text-muted small mt-3">
                                    Didn&apos;t receive the email? Check your spam folder or{" "}
                                    <button
                                        className="btn btn-link p-0 text-primary text-decoration-none fw-semibold small"
                                        onClick={() => { setSent(false); setEmail(""); }}
                                    >
                                        try again
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <div className="input-icon-wrapper">
                                        <FaEnvelope className="input-icon" />
                                        <Form.Control
                                            type="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="auth-input"
                                            style={{ paddingInlineStart: "2.5rem" }}
                                        />
                                    </div>
                                </Form.Group>

                                <Button type="submit" className="w-100 auth-btn py-2 fw-semibold" disabled={loading}>
                                    {loading
                                        ? <><Spinner as="span" animation="border" size="sm" className="me-2" />Sending...</>
                                        : "Send Reset Link"}
                                </Button>
                            </Form>
                        )}

                        <hr className="my-4" />
                        <p className="text-center mb-0">
                            <Link href="/login" className="text-primary text-decoration-none small fw-semibold">
                                <FaArrowLeft className="me-1" size={12} />
                                Back to Sign In
                            </Link>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default ForgotPassword;
