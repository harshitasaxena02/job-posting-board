const express = require('express');
const router = express.Router();
const { createJob } = require('../controllers/jobController');

router.post('/post-job', createJob);

module.exports = router;
