import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Container, Row, Col } from "react-bootstrap";
import { FaBus, FaHeart, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="pt-5 pb-3"
      style={{
        background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
        color: "rgba(255,255,255,.7)",
        borderTop: "1px solid rgba(255,255,255,.05)",
      }}
    >
      <Container>
        <Row className="gy-4 align-items-center mb-4 pb-4 border-bottom border-secondary border-opacity-25">
          <Col md={6} className="text-start">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                className="d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm"
                style={{ width: "40px", height: "40px" }}
              >
                <FaBus size={18} style={{ color: "var(--c-primary)" }} />
              </div>
              <span className="text-white fw-bold fs-4 ms-2">
                EGYPT VISTA
              </span>
            </div>
            <p className="mb-0 small" style={{ maxWidth: "350px", lineHeight: "1.6" }}>
              Your premier destination for comfortable and enjoyable travel experiences across Egypt. We offer the best services with the highest quality standards.
            </p>
          </Col>
          <Col md={6} className="text-end">
            <div className="d-flex justify-content-md-end gap-3 mt-3 mt-md-0">
              <a href="#" className="text-white opacity-75 hover-grow" style={{ transition: "all 0.3s" }}>
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white opacity-75 hover-grow" style={{ transition: "all 0.3s" }}>
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white opacity-75 hover-grow" style={{ transition: "all 0.3s" }}>
                <FaInstagram size={24} />
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <p className="mb-0 small">
              Made with love in Egypt{" "}
              <FaHeart className="mx-1" style={{ color: "#EF4444" }} />{" "}
              © {new Date().getFullYear()} All rights reserved. EGYPT VISTA.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;