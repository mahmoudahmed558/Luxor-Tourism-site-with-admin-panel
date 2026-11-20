import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import Seo from '../Components/Seo';
import axios from 'axios';
import PublicLayout from '../Layouts/PublicLayout';
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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/contact', {
        name: contactForm.name,
        email: contactForm.email,
        subject: contactForm.service || 'General Inquiry',
        message: `${contactForm.message}\n\nPhone: ${contactForm.phone}`
      });
      
      setContactForm({ name: '', email: '', phone: '', message: '', service: '' });
      alert('Your message has been sent successfully! We will contact you soon.');
    } catch (err) {
      alert('There was a validation error or connection problem. Please try again.');
      console.error(err.response?.data || err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #F8FAFC 60%, #E0E7FF 100%)',
        overflowX: 'hidden',
      }}
    >
      <Seo title="Contact Us" description="Get in touch with Sya7a for any inquiries about our tour programs or travel services in Egypt." />
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
                { icon: FaPhone, title: 'Phone', value: '+201550839756', color: colors.secondary },
                { icon: FaEnvelope, title: 'Email', value: 'mohammedtoursegypt@gmail.com', color: colors.accent },
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
              
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ContactUs.layout = page => <PublicLayout>{page}</PublicLayout>;

export default ContactUs;
