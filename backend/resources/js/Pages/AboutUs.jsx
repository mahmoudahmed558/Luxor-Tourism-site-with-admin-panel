import PublicLayout from "../Layouts/PublicLayout";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';
import {
  FaPhone,
  FaPlane,
  FaRoute,
  FaCar,
  FaCheck,
  FaRocket,
} from 'react-icons/fa';
import { router } from "@inertiajs/react";
import Seo from "../Components/Seo";


const colors = {
  primary: '#1E40AF',
  secondary: '#10B981',
  accent: '#F59E0B',
  light: '#F3F4F6',
  dark: '#1F2937',
  background: '#F8FAFC'
};

const AboutUs = () => {
  // const navigate = router;

  const services = [
    {
      icon: FaPlane,
      title: "Airport Transfers",
      description: "Premium transfer service to and from all Egyptian airports",
      features: ["Real-time flight tracking", "Professional drivers", "Modern vehicles"]
    },
    {
      icon: FaRoute,
      title: "Tourist Tours",
      description: "Discover Egypt's most beautiful tourist spots with professional guides",
      features: ["Professional guides", "Flexible schedules", "Competitive prices"]
    }
    
  ];

  return (
    <div
      className="min-vh-100 position-relative"
      style={{
        background: 'linear-gradient(135deg, #F8FAFC 60%, #E0E7FF 100%)',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Seo title="About Us" description="Learn more about Sya7a and our premium travel services in Egypt including transfers and guided tours." />
      <Container className="py-5">
        {/* Hero Section */}
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card className="border-0 shadow-lg" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
                <div className="mb-4">
                  <div
                    className="mx-auto d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '80px', height: '80px', borderRadius: '50%',
                      backgroundColor: `${colors.primary}20`
                    }}
                  >
                    <img src="/assets/LET.png" alt="Luxor Elite Tours Logo" style={{ height: '100px', borderRadius: '10px', backgroundColor: '#1E293B' }} />
                  </div>
                  <h1 className="display-5 fw-bold mb-3" style={{ color: colors.primary }}>
                    Luxor Elite Tours
                  </h1>
                  <p className="lead mb-4" style={{ color: colors.dark }}>
                    Learn about our company and services
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => router.visit('/programs')}
                      style={{ background: colors.primary, border: 'none' }}
                    >
                      <FaRoute className="me-2" />
                      Book Now
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="lg"
                      onClick={() => router.visit('/contact')}
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      <FaPhone className="me-2" />
                      Contact Us
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Services Section */}
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card className="border-0 shadow-lg mb-4" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
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

AboutUs.layout = page => <PublicLayout>{page}</PublicLayout>;

export default AboutUs;
