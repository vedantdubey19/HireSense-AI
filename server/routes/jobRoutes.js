const express = require('express');
const router = express.Router();
const { setJobDescription } = require('../controllers/jobController');

router.post('/', setJobDescription);

module.exports = router;
