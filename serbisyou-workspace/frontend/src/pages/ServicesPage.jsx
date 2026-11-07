import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Alert, Spinner } from 'react-bootstrap';
import { servicesApi } from '../services/api';

const sampleServices = [
  {
    id: 1,
    title: 'Custom Graphic Design & Pubmat',
    category: 'Creative & Graphic Design',
    price: 250,
    provider: 'Alex (BSCS 3rd Year)',
    description: 'High-quality publication materials for campus orgs, events, and flyers.',
  },
  {
    id: 2,
    title: 'Event Photography & Quick Edits',
    category: 'Event Support & Photography',
    price: 600,
    provider: 'Maria (BMA 2nd Year)',
    description: 'Full coverage for college events, birthdays, or org assemblies with RAW delivery.',
  },
  {
    id: 3,
    title: 'Python & Data Structures Tutoring',
    category: 'Academic Tutoring',
    price: 300,
    provider: 'David (BSIT 4th Year)',
    description: '1-on-1 exam review and programming assignment guidance.',
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState(sampleServices);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const res = await servicesApi.getAll();
        if (res && res.data && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (err) {
        console.warn('Backend API not responding yet, displaying starter baseline data.', err);
        setApiError('Notice: Backend API is running with starter mock data until Supabase tables are seeded.');
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Available Campus Services</h2>
          <p className="text-muted mb-0">Browse skills and services offered by fellow students.</p>
        </div>
      </div>

      {apiError && <Alert variant="info" dismissible>{apiError}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="g-4">
          {services.map((item) => (
            <Col md={4} key={item.id}>
              <Card className="service-card shadow-sm border-0">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <Badge bg="secondary" className="mb-2">{item.category}</Badge>
                    <Card.Title className="fw-bold fs-5">{item.title}</Card.Title>
                    <p className="small text-muted mb-2">Offered by: {item.provider || 'Student Provider'}</p>
                  </div>
                  <Card.Text className="text-muted small flex-grow-1">
                    {item.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                    <span className="fw-bold text-primary fs-5">₱{item.price}</span>
                    <button className="btn btn-sm btn-outline-primary">Request Service</button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
