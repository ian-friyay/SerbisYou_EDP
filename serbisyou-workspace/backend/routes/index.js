const express = require('express');
const router = express.Router();
const serviceRoutes = require('./serviceRoutes');

// Root API welcome endpoint
router.get('/', (req, res) => {
  res.json({
    project: 'SerbisYou API',
    version: '1.0.0',
    description: 'Campus Skill Marketplace Backend API',
    endpoints: {
      health: '/health',
      services: '/api/services',
    },
  });
});

// Service listing and transaction routes
router.use('/services', serviceRoutes);

module.exports = router;
