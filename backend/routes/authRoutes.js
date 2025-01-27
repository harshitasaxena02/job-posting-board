const express = require('express');
const { registerCompany, loginCompany } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', loginCompany);

module.exports = router;
