// routes/authRoutes.js
const express = require('express');
const { login, signup } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup); // Ensure signup is included

module.exports = router;
