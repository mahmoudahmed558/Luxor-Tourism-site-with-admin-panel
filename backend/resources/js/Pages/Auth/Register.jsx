// src/pages/Register.jsx — frontend-only version (no Firebase)
import { useState, useEffect, useRef } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Container, Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaArrowLeft } from "react-icons/fa";
import gsap from "gsap";

const tr = {
    title: "Create Account", subtitle: "Join us and explore the beauty of Egypt",
    name: "Full Name", email: "Email Address",
    password: "Password", confirmPassword: "Confirm Password",
    register: "Create Account", registering: "Creating account...",
    haveAccount: "Already have an account?", login: "Sign In",
    passwordMismatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 6 characters",
    errors: {
        "auth/email-already-in-use": "This email is already registered",
        default: "An error occurred while creating your account",
    },
};

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const bgRef = useRef();
    const cardRef = useRef();
    const iconRef = useRef();
    const fieldsRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
            .fromTo(cardRef.current, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.2")
            .fromTo(iconRef.current, { scale: 0, rotation: 180 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3")
            .fromTo(Array.from(fieldsRef.current?.children || []),
                { opacity: 0, x: -25 },
                { opacity: 1, x: 0, duration: 0.35, stagger: 0.08 }, "-=0.15");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        post('/register', {
            onError: () => {
                gsap.fromTo(cardRef.current,
                    { x: 0 },
                    { keyframes: { x: [-12, 12, -8, 8, -4, 4, 0] }, duration: 0.5, ease: "none" }
                );
            }
        });
    };

    return (
        <div ref={bgRef}
            className="min-vh-100 d-flex align-items-center justify-content-center auth-bg py-5"
            style={{ opacity: 0 }}>
            <Container style={{ maxWidth: 440 }}>
                <div className="text-center mb-3">
                    <Link href="/" className="text-white text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1"
                        style={{ opacity: 0.8, transition: "opacity 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}>
                        <FaArrowLeft size={12} /> Back to Home
                    </Link>
                </div>
                <Card ref={cardRef} className="border-0 shadow-lg auth-card" style={{ opacity: 0 }}>
                    <Card.Body className="p-4 p-md-5">
                        <div className="text-center mb-4">
                            <div ref={iconRef} className="auth-icon-wrapper mb-3" style={{ opacity: 0 }}>
                                <FaUserPlus size={28} />
                            </div>
                            <h2 className="fw-bold text-dark mb-1">{tr.title}</h2>
                            <p className="text-muted small">{tr.subtitle}</p>
                        </div>

                        {Object.values(errors).length > 0 && (
                            <Alert variant="danger" className="rounded-3 py-2 small">
                                {Object.values(errors)[0]}
                            </Alert>
                        )}

                        <div ref={fieldsRef}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <div className="input-icon-wrapper">
                                        <FaUser className="input-icon" />
                                        <Form.Control type="text" placeholder={tr.name} value={data.name}
                                            onChange={(e) => setData("name", e.target.value)} required className="auth-input"
                                            style={{ paddingInlineStart: "2.5rem" }} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <div className="input-icon-wrapper">
                                        <FaEnvelope className="input-icon" />
                                        <Form.Control type="email" placeholder={tr.email} value={data.email}
                                            onChange={(e) => setData("email", e.target.value)} required className="auth-input"
                                            style={{ paddingInlineStart: "2.5rem" }} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <div className="input-icon-wrapper">
                                        <FaLock className="input-icon" />
                                        <Form.Control type="password" placeholder={tr.password} value={data.password}
                                            onChange={(e) => setData("password", e.target.value)} required className="auth-input"
                                            style={{ paddingInlineStart: "2.5rem" }} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <div className="input-icon-wrapper">
                                        <FaLock className="input-icon" />
                                        <Form.Control type="password" placeholder={tr.confirmPassword} value={data.password_confirmation}
                                            onChange={(e) => setData("password_confirmation", e.target.value)} required className="auth-input"
                                            style={{ paddingInlineStart: "2.5rem" }} />
                                    </div>
                                </Form.Group>

                                <Button type="submit" className="w-100 auth-btn py-2 fw-semibold" disabled={processing}>
                                    {processing
                                        ? <><Spinner as="span" animation="border" size="sm" className="me-2" />{tr.registering}</>
                                        : tr.register}
                                </Button>
                            </Form>

                            <hr className="my-4" />
                            <p className="text-center text-muted small mb-0">
                                {tr.haveAccount}{" "}
                                <Link href="/login" className="fw-semibold text-primary text-decoration-none">{tr.login}</Link>
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
