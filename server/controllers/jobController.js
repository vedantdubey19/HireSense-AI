const Job = require('../models/Job');
const { getEmbedding } = require('../utils/embeddingService');

// @route   POST /api/jobs
// @desc    Set job description and calculate its embedding
exports.setJobDescription = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    // Get embedding for job description
    const embedding = await getEmbedding(description);

    // Deactivate previous jobs
    await Job.updateMany({}, { isActive: false });

    // Save new job
    const job = new Job({
      title: title || 'Untitled Job',
      description,
      embedding,
      isActive: true
    });

    await job.save();

    res.status(201).json({ message: 'Job description saved successfully', job });
  } catch (error) {
    console.error('Error setting job description:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
