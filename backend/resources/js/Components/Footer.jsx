import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Container, Row, Col } from "react-bootstrap";
import { FaBus, FaHeart, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaMailBulk } from "react-icons/fa";

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
                className="d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
              >
                <img src="/assets/LET.png" alt="Luxor Elite Tours Logo" style={{ height: '40px', marginRight: '10px', borderRadius: '4px' }} />
          
              </div>
              <span className="text-white fw-bold fs-4 ms-2">
                Luxor Elite Tours
              </span>
            </div>
            <p className="mb-0 small" style={{ maxWidth: "350px", lineHeight: "1.6" }}>
              Your premier destination for comfortable and enjoyable travel experiences across Luxor. We offer the best services with the highest quality standards.
            </p>
          </Col>
          <Col md={6} className="text-end">
            <div className="d-flex justify-content-md-end gap-3 mt-3 mt-md-0">
              <a href="https://wa.me/201550839756" target="_blank" rel="noopener noreferrer" className="text-white opacity-75 hover-grow" style={{ transition: "all 0.3s" }}>
                <FaWhatsapp size={24} />
              </a>
              <a href="mailto:mohammedtoursegypt@gmail.com" className="text-white opacity-75 hover-grow" style={{ transition: "all 0.3s" }}>
                <FaMailBulk size={24} />
              </a>
              <a href="https://www.instagram.com/luxor_elite_tours" target="_blank" rel="noopener noreferrer" className="text-white opacity-75 hover-grow" style={{ transition: "all 0.3s" }}>
                <FaInstagram size={24} />
              </a>
              <a href="https://www.facebook.com/share/1RJ7bYQP9r/" target="_blank" rel="noopener noreferrer" className="text-white opacity-75 hover-grow" style={{ transition: "all 0.3s" }}>
                <FaFacebook size={24} />
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <p className="mb-0 small">
              Made with love in Egypt{" "}
              <FaHeart className="mx-1" style={{ color: "#EF4444" }} />{" "}
              © {new Date().getFullYear()} All rights reserved. Luxor Elite Tours.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
