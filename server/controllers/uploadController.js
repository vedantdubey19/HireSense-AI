const Candidate = require('../models/Candidate');
const Job = require('../models/Job');
const { getEmbedding, getSimilarity } = require('../utils/embeddingService');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

// Helper to extract text from file buffers
const extractText = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase();
  try {
    if (ext === '.pdf') {
      const data = await pdfParse(file.buffer);
      return data.text;
    } else if (ext === '.docx') {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      return result.value;
    }
  } catch (e) {
    console.error(`Error extracting text from ${file.originalname}:`, e);
    return "";
  }
  return "";
};

// Very basic skill extraction mock for visuals since explicit NLP NER isn't outlined
const extractSkillsMock = (text) => {
  const allSkills = ['React', 'Node.js', 'Python', 'Docker', 'AWS', 'TensorFlow', 'SQL', 'MongoDB', 'Java', 'C++', 'GraphQL'];
  return allSkills.filter(skill => text.toLowerCase().includes(skill.toLowerCase())).slice(0, 3);
};

// @route   POST /api/upload
// @desc    Upload resumes, extract text, embed, match and rank
exports.uploadResumes = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No resumes uploaded' });
    }

    // Identify active job description
    const activeJob = await Job.findOne({ isActive: true });
    if (!activeJob) {
      return res.status(400).json({ error: 'Please set a Job Description first' });
    }

    const jobEmbedding = activeJob.embedding;
    const processingPromises = files.map(async (file) => {
      const originalName = file.originalname;
      const baseName = path.parse(originalName).name;

      try {
        // 1. Text Extraction
        const text = await extractText(file);
        if (!text || text.trim().length === 0) {
          console.warn(`Could not extract text from ${originalName}`);
          return null;
        }

        // 2. Embedding
        const resumeEmbedding = await getEmbedding(text);

        // 3. Similarity Score (Cosine)
        const scoreRaw = await getSimilarity(resumeEmbedding, jobEmbedding);
        // Scale to 0-100 and format
        const matchScore = Math.max(0, Math.min(100, Math.round(scoreRaw * 100)));
        
        const skills = extractSkillsMock(text);

        // 4. Save to DB
        const candidate = new Candidate({
          name: baseName.replace(/[-_]/g, ' '), // rudimentary name parsing
          role: 'Candidate', // Defaulting role
          resumeText: text.substring(0, 500) + '...', // Saving snippet
          skills: skills.length > 0 ? skills : ['Generalist'],
          matchScore,
          embedding: resumeEmbedding
        });

        await candidate.save();
        return candidate;
      } catch (err) {
        console.error(`Error processing file ${originalName}:`, err);
        return null;
      }
    });

    await Promise.all(processingPromises);

    // Fetch and sort all to return latest rankings
    const candidates = await Candidate.find().sort({ matchScore: -1 });

    res.status(200).json({ 
      message: `${files.length} resumes successfully processed and ranked`,
      candidates 
    });

  } catch (error) {
    console.error('Error in upload routine:', error);
    res.status(500).json({ error: 'Server error during upload process' });
  }
};
