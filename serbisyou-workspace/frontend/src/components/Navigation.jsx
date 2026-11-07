import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

export default function Navigation() {
  const { connected } = useSocket();

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
          <span>🎓 SerbisYou</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="serbisyou-navbar-nav" />
        <Navbar.Collapse id="serbisyou-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/services">
              Browse Services
            </Nav.Link>
            <Nav.Link as={NavLink} to="/chat">
              Messages
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <span className="me-2 text-light small">
              Live Chat Server:{' '}
              {connected ? (
                <Badge bg="success">Online</Badge>
              ) : (
                <Badge bg="secondary">Offline</Badge>
              )}
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
