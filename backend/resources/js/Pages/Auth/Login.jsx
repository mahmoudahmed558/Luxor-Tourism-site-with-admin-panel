// src/pages/Login.jsx — frontend-only version (no Firebase)
import { useState, useEffect, useRef } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Container, Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import { FaEnvelope, FaLock, FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import gsap from "gsap";

const tr = {
    title: "Sign In", subtitle: "Welcome back! Sign in to continue your journey",
    email: "Email Address", password: "Password",
    login: "Sign In", loggingIn: "Signing in...",
    noAccount: "Don't have an account?", register: "Create Account",
    errors: {
        "auth/invalid-credential": "Incorrect email or password",
        default: "An error occurred while signing in",
    },
};

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });
    // const location = useLocation();
    const from = "/";

    const bgRef = useRef();
    const cardRef = useRef();
    const iconRef = useRef();
    const fieldsRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
            .fromTo(cardRef.current, { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, "-=0.3")
            .fromTo(iconRef.current, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3")
            .fromTo(Array.from(fieldsRef.current?.children || []),
                { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.1");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        post('/login', {
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
            className="min-vh-100 d-flex align-items-center justify-content-center auth-bg"
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
                                <FaSignInAlt size={28} />
                            </div>
                            <h2 className="fw-bold text-dark mb-1">{tr.title}</h2>
                            <p className="text-muted small">{tr.subtitle}</p>
                        </div>

                        {errors.email && (
                            <Alert variant="danger" className="rounded-3 py-2 small">
                                {errors.email}
                            </Alert>
                        )}
                        {errors.password && (
                            <Alert variant="danger" className="rounded-3 py-2 small">
                                {errors.password}
                            </Alert>
                        )}

                        

                        <div ref={fieldsRef}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <div className="input-icon-wrapper">
                                        <FaEnvelope className="input-icon" />
                                        <Form.Control type="email" placeholder={tr.email} value={data.email}
                                            onChange={(e) => setData("email", e.target.value)} required className="auth-input"
                                            style={{ paddingInlineStart: "2.5rem" }} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <div className="input-icon-wrapper">
                                        <FaLock className="input-icon" />
                                        <Form.Control type="password" placeholder={tr.password} value={data.password}
                                            onChange={(e) => setData("password", e.target.value)} required className="auth-input"
                                            style={{ paddingInlineStart: "2.5rem" }} />
                                    </div>
                                </Form.Group>

                                <div className="text-end mb-3">
                                    <Link href="/forgot-password" className="text-primary text-decoration-none small fw-semibold"
                                        style={{ transition: "opacity 0.2s" }}
                                        onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                                        onMouseLeave={(e) => e.target.style.opacity = "1"}>
                                        Forgot Password?
                                    </Link>
                                </div>

                                <Button type="submit" className="w-100 auth-btn py-2 fw-semibold" disabled={processing}>
                                    {processing
                                        ? <><Spinner as="span" animation="border" size="sm" className="me-2" />{tr.loggingIn}</>
                                        : tr.login}
                                </Button>
                            </Form>

                            <hr className="my-4" />
                            <p className="text-center text-muted small mb-0">
                                {tr.noAccount}{" "}
                                <Link href="/register" className="fw-semibold text-primary text-decoration-none">{tr.register}</Link>
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
