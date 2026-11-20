// src/pages/ContactUs.jsx
import { useState, useEffect, useRef } from 'react';
import {
  Container, Row, Col, Card, Button, Form,
  FloatingLabel, Spinner
} from 'react-bootstrap';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin
} from 'react-icons/fa';
import gsap from 'gsap';

const colors = {
  primary: '#1E40AF',
  secondary: '#10B981',
  accent: '#F59E0B',
  dark: '#1F2937',
};

const ContactUs = () => {
  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', message: '', service: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.contact-info-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );
    }
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setContactForm({ name: '', email: '', phone: '', message: '', service: '' });
      alert('Your message has been sent successfully! We will contact you soon.');
    }, 2000);
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #F8FAFC 60%, #E0E7FF 100%)',
        overflowX: 'hidden',
      }}
    >
      <Container className="py-5">
        {/* Hero */}
        <Row className="justify-content-center mb-5" ref={heroRef}>
          <Col lg={10}>
            <Card className="border-0 shadow-lg" style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: `2px solid ${colors.primary}20`,
              overflow: 'hidden'
            }}>
              <div style={{
                height: '8px',
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                width: '100%'
              }} />
              <Card.Body className="text-center py-5 px-4">
                <div className="mx-auto d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    backgroundColor: `${colors.primary}20`
                  }}>
                  <FaPhone size={36} style={{ color: colors.primary }} />
                </div>
                <h1 className="display-5 fw-bold mb-3" style={{ color: colors.primary }}>
                  Contact Us
                </h1>
                <p className="lead mb-0" style={{ color: colors.dark }}>
                  Get in touch with us — we'd love to hear from you
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Info Cards */}
        <Row className="justify-content-center mb-5" ref={cardsRef}>
          <Col lg={10}>
            <Row className="g-4">
              {[
                { icon: FaMapMarkerAlt, title: 'Address', value: 'Hurghada, Egypt', color: colors.primary },
                { icon: FaPhone, title: 'Phone', value: '+201551927216', color: colors.secondary },
                { icon: FaEnvelope, title: 'Email', value: 'mohamedhafiza1234@gmail.com', color: colors.accent },
                { icon: FaClock, title: 'Working Hours', value: '24/7', color: colors.primary },
              ].map((item, idx) => (
                <Col md={3} sm={6} key={idx}>
                  <Card className="contact-info-card border-0 shadow-sm h-100 text-center" style={{ borderRadius: '16px' }}>
                    <Card.Body className="p-4">
                      <div className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px', height: '60px', borderRadius: '50%',
                          backgroundColor: `${item.color}20`
                        }}>
                        <item.icon size={25} style={{ color: item.color }} />
                      </div>
                      <h6 className="fw-bold">{item.title}</h6>
                      <p className="text-muted small mb-0">{item.value}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Contact Form + Map */}
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card className="border-0 shadow-lg" style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: `2px solid ${colors.primary}20`
            }}>
              <Card.Header style={{ backgroundColor: colors.secondary, color: 'white', borderRadius: '20px 20px 0 0' }}>
                <h3 className="mb-0 text-center">
                  <FaEnvelope className="me-2" />
                  Send us a Message
                </h3>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="g-4">
                  <Col md={7}>
                    <Form onSubmit={handleContactSubmit}>
                      <Row className="g-3">
                        <Col md={6}>
                          <FloatingLabel label="Full Name">
                            <Form.Control
                              type="text"
                              value={contactForm.name}
                              onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                              required
                              className="border-0 shadow-sm"
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel label="Email">
                            <Form.Control
                              type="email"
                              value={contactForm.email}
                              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                              required
                              className="border-0 shadow-sm"
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel label="Phone Number">
                            <Form.Control
                              type="tel"
                              value={contactForm.phone}
                              onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                              className="border-0 shadow-sm"
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={6}>
                          <FloatingLabel label="Service Type">
                            <Form.Select
                              value={contactForm.service}
                              onChange={(e) => setContactForm(prev => ({ ...prev, service: e.target.value }))}
                              className="border-0 shadow-sm"
                            >
                              <option value="">Select Service</option>
                              <option value="airport">Airport Transfer</option>
                              <option value="tour">Tourist Tours</option>
                              <option value="rental">Car Rental</option>
                              <option value="other">Other</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                        <Col md={12}>
                          <FloatingLabel label="Message">
                            <Form.Control
                              as="textarea"
                              rows={4}
                              value={contactForm.message}
                              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                              required
                              className="border-0 shadow-sm"
                              style={{ height: '120px' }}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md={12}>
                          <Button
                            type="submit"
                            size="lg"
                            className="w-100"
                            disabled={isLoading}
                            style={{ background: colors.primary, border: 'none', borderRadius: '12px' }}
                          >
                            {isLoading ? (
                              <><Spinner size="sm" className="me-2" /> Sending...</>
                            ) : (
                              <><FaEnvelope className="me-2" /> Send Message</>
                            )}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col md={5}>
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Our Location on Map</h6>
                      <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(30,64,175,0.08)' }}>
                        <iframe
                          title="Company Location"
                          src="https://www.openstreetmap.org/export/embed.html?bbox=33.799%2C27.257%2C33.809%2C27.267&layer=mapnik"
                          width="100%"
                          height="200"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                    <Button
                      variant="success"
                      size="lg"
                      href="https://wa.me/201551927216"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-100 d-flex align-items-center justify-content-center"
                      style={{ borderRadius: '12px' }}
                    >
                      <FaWhatsapp className="me-2" />
                      Contact via WhatsApp
                    </Button>

                    {/* Social Media */}
                    <div className="text-center mt-4">
                      <h6 className="mb-3">Follow Us</h6>
                      <div className="d-flex justify-content-center gap-3">
                        <Button variant="outline-success" size="sm"><FaWhatsapp /></Button>
                        <Button variant="outline-primary" size="sm"><FaFacebook /></Button>
                        <Button variant="outline-danger" size="sm"><FaInstagram /></Button>
                        <Button variant="outline-info" size="sm"><FaTwitter /></Button>
                        <Button variant="outline-primary" size="sm"><FaLinkedin /></Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
