import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container className="text-center py-5">
      <h1 className="display-1 fw-bold text-muted">404</h1>
      <h3 className="mb-3">Page Not Found</h3>
      <p className="text-muted mb-4">
        The page you are looking for does not exist on SerbisYou.
      </p>
      <Button as={Link} to="/" variant="primary">
        Return to Home
      </Button>
    </Container>
  );
}
