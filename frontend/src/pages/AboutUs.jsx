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
import { useNavigate } from 'react-router-dom';


const colors = {
  primary: '#1E40AF',
  secondary: '#10B981',
  accent: '#F59E0B',
  light: '#F3F4F6',
  dark: '#1F2937',
  background: '#F8FAFC'
};

const AboutUs = () => {
  const navigate = useNavigate();

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
    },
    {
      icon: FaCar,
      title: "Car Rental",
      description: "Rent modern cars with professional drivers for your trips",
      features: ["Modern cars", "Professional drivers", "Comprehensive insurance"]
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
                    <FaRocket size={40} style={{ color: colors.primary }} />
                  </div>
                  <h1 className="display-5 fw-bold mb-3" style={{ color: colors.primary }}>
                    Wasalny
                  </h1>
                  <p className="lead mb-4" style={{ color: colors.dark }}>
                    Learn about our company and services
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => navigate('/user')}
                      style={{ background: colors.primary, border: 'none' }}
                    >
                      <FaRoute className="me-2" />
                      Book Now
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="lg"
                      onClick={() => navigate('/contact')}
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
              <Card.Header style={{ backgroundColor: colors.secondary, color: 'white', borderRadius: '20px 20px 0 0' }}>
                <h3 className="mb-0 text-center">
                  <FaRoute className="me-2" />
                  Our Premium Services
                </h3>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="g-4">
                  {services.map((service, index) => (
                    <Col md={4} key={index}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center p-4">
                          <div
                            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                            style={{
                              width: '70px', height: '70px', borderRadius: '50%',
                              backgroundColor: `${colors.primary}20`
                            }}
                          >
                            <service.icon size={35} style={{ color: colors.primary }} />
                          </div>
                          <h5 className="fw-bold mb-3" style={{ color: colors.primary }}>
                            {service.title}
                          </h5>
                          <p className="text-muted mb-4">
                            {service.description}
                          </p>
                          <div className="text-start">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="d-flex align-items-center mb-2">
                                <FaCheck size={14} className="me-2" style={{ color: colors.secondary }} />
                                <small className="text-muted">{feature}</small>
                              </div>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;