import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Creative & Graphic Design', icon: '🎨', desc: 'Logos, posters, presentation slides, pubmats' },
  { name: 'Event Support & Photography', icon: '📷', desc: 'Coverage, photo booths, stage assistance' },
  { name: 'Video Editing & Media', icon: '🎬', desc: 'Reels, YouTube edits, short film stitching' },
  { name: 'Academic Tutoring', icon: '📚', desc: 'Math, programming, language, and exam prep' },
  { name: 'Technical & IT Support', icon: '💻', desc: 'Software installation, PC cleanup, coding help' },
  { name: 'Writing & Proofreading', icon: '✍️', desc: 'Essays, research formatting, editing' },
];

export default function HomePage() {
  return (
    <div>
      <div className="hero-section text-center">
        <Container>
          <Badge bg="light" text="dark" className="mb-3 px-3 py-2 fw-semibold">
            Campus Gig & Skill Economy
          </Badge>
          <h1 className="display-4 fw-bold mb-3">SerbisYou</h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '650px' }}>
            Empowering students to monetize creative talents and digital skills while providing
            peers with affordable, accessible campus services.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/services" variant="warning" size="lg" className="fw-semibold">
              Explore Services
            </Button>
            <Button as={Link} to="/chat" variant="outline-light" size="lg">
              Open Chat
            </Button>
          </div>
        </Container>
      </div>

      <Container className="py-4">
        <h2 className="text-center fw-bold mb-4">Popular Service Categories</h2>
        <Row className="g-4">
          {categories.map((cat, idx) => (
            <Col md={4} sm={6} key={idx}>
              <Card className="service-card shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="display-5 mb-3">{cat.icon}</div>
                  <Card.Title className="fw-bold">{cat.name}</Card.Title>
                  <Card.Text className="text-muted small">{cat.desc}</Card.Text>
                  <Button as={Link} to={`/services?category=${encodeURIComponent(cat.name)}`} variant="outline-primary" size="sm">
                    View Listings
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
