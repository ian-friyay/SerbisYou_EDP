import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-light py-4 border-top mt-auto">
      <Container className="text-center text-muted small">
        <p className="mb-1">
          <strong>SerbisYou</strong> — Campus Skill Marketplace
        </p>
        <p className="mb-0">
          Student-to-student creative, event support, and digital service transactions.
        </p>
      </Container>
    </footer>
  );
}
