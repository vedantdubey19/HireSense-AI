const express = require('express');
const router = express.Router();
const { getCandidates, clearCandidates } = require('../controllers/candidateController');

router.route('/')
  .get(getCandidates)
  .delete(clearCandidates);

module.exports = router;
