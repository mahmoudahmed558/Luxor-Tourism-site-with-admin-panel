// src/components/MainNavbar.jsx — auth-aware navbar
import { useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { FaBus, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import gsap from "gsap";
import { useAuth } from "../contexts/AuthContext";

const MainNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const navRef = useRef(null);
  const { currentUser, userProfile, isAdmin, logout } = useAuth();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const userName = userProfile?.name || userProfile?.displayName || "User";
  const initials = userName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <Navbar ref={navRef} expand="lg" className="main-navbar shadow-sm" sticky="top" style={{
      background: "rgba(30, 41, 59, 0.85)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
    }}>
      <Container fluid="xl">
        {/* Left — Logo */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <FaBus className="me-2 text-primary" style={{ color: "var(--c-accent)" }} />
          Egypt Tourism
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" className="border-0 shadow-none" style={{ filter: "invert(1)" }} />

        <Navbar.Collapse id="main-nav">
          {/* Center — Nav links */}
          <Nav className="mx-auto align-items-lg-center gap-2">
            <Nav.Link as={Link} to="/" className={`nav-link-custom ${isActive("/") ? "active" : ""}`}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/programs" className={`nav-link-custom ${isActive("/programs") ? "active" : ""}`}>
              Programs
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={`nav-link-custom ${isActive("/about") ? "active" : ""}`}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={`nav-link-custom ${isActive("/contact") ? "active" : ""}`}>
              Contact Us
            </Nav.Link>
          </Nav>

          {/* Right — Auth */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {currentUser ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  className="d-flex align-items-center gap-2 border-0 bg-transparent"
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center fw-bold text-white"
                    style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                      fontSize: ".8rem",
                    }}
                  >
                    {initials}
                  </div>
                  <span className="text-white fw-semibold d-none d-lg-inline" style={{ fontSize: ".9rem" }}>
                    {userName}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    borderRadius: 12,
                    border: "none",
                    boxShadow: "0 10px 40px rgba(0,0,0,.15)",
                    minWidth: 200,
                    padding: "8px",
                  }}
                >
                  <div className="px-3 py-2 border-bottom mb-1">
                    <div className="fw-bold" style={{ color: "#1E293B", fontSize: ".9rem" }}>{userName}</div>
                    <div className="text-muted" style={{ fontSize: ".75rem" }}>{userProfile?.email}</div>
                  </div>
                  <Dropdown.Item
                    as={Link}
                    to="/profile"
                    className="d-flex align-items-center gap-2 rounded-2 px-3 py-2"
                    style={{ fontSize: ".9rem" }}
                  >
                    <FaUser size={13} className="text-muted" /> My Profile
                  </Dropdown.Item>
                  {isAdmin && (
                    <Dropdown.Item
                      as={Link}
                      to="/admin"
                      className="d-flex align-items-center gap-2 rounded-2 px-3 py-2"
                      style={{ fontSize: ".9rem" }}
                    >
                      <FaCog size={13} className="text-muted" /> Admin Panel
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider className="my-1" />
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="d-flex align-items-center gap-2 rounded-2 px-3 py-2 text-danger"
                    style={{ fontSize: ".9rem" }}
                  >
                    <FaSignOutAlt size={13} /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-light"
                  size="sm"
                  className="rounded-pill px-3 hover-grow"
                  style={{ fontWeight: "600", transition: "all 0.3s" }}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  size="sm"
                  className="rounded-pill px-3 hover-grow"
                  style={{ fontWeight: "600", transition: "all 0.3s" }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
