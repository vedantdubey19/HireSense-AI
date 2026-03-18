const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const { uploadResumes } = require('../controllers/uploadController');

// Accept multiple files with field name 'resumes', max 10 files
router.post('/', upload.array('resumes', 10), uploadResumes);

module.exports = router;
