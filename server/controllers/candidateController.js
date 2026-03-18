const Candidate = require('../models/Candidate');

// @route   GET /api/candidates
// @desc    Get all ranked candidates
exports.getCandidates = async (req, res) => {
  try {
    // Fetch and sort by matchScore DESC
    const candidates = await Candidate.find().sort({ matchScore: -1 });
    
    // Assign ranks
    const rankedCandidates = candidates.map((cand, index) => {
      cand.rank = index + 1;
      return cand;
    });

    res.status(200).json(rankedCandidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   DELETE /api/candidates
// @desc    Clear all candidates from db
exports.clearCandidates = async (req, res) => {
  try {
    await Candidate.deleteMany({});
    res.status(200).json({ message: 'All candidates cleared' });
  } catch (error) {
    console.error('Error clearing candidates:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
