const express = require('express');
const router = express.Router();
const { getAllServices, createService } = require('../controllers/serviceController');

// GET /api/services - list all services
router.get('/', getAllServices);

// POST /api/services - create new service
router.post('/', createService);

module.exports = router;
