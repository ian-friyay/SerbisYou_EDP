/**
 * Supabase Table Name Constants & Schemas Reference
 * For SerbisYou Campus Skill Marketplace
 */
const TABLES = {
  USERS: 'users',
  SERVICES: 'services',
  SERVICE_TRANSACTIONS: 'service_transactions',
  SERVICE_REQUESTS: 'service_requests',
};

const TRANSACTION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DISPUTED: 'disputed',
};

const SERVICE_CATEGORIES = [
  'Creative & Graphic Design',
  'Event Support & Photography',
  'Video Editing & Media',
  'Academic Tutoring',
  'Technical & IT Support',
  'Writing & Proofreading',
];

module.exports = {
  TABLES,
  TRANSACTION_STATUS,
  SERVICE_CATEGORIES,
};
