const axios = require('axios');

const NLP_SERVICE_URL = process.env.NLP_SERVICE_URL || 'http://nlp-service:8000';

const getEmbedding = async (text, isQuery = false) => {
  try {
    const response = await axios.post(`${NLP_SERVICE_URL}/embed`, { text, is_query: isQuery });
    return response.data.embedding;
  } catch (error) {
    console.error('Error connecting to NLP service:', error.message);
    throw new Error('Failed to generate embedding');
  }
};

const getSimilarity = async (vec1, vec2) => {
  try {
    // Calling our python service
    const response = await axios.post(`${NLP_SERVICE_URL}/similarity`, { vec1, vec2 });
    return response.data.score;
  } catch (error) {
    console.error('Error connecting to NLP service for similarity:', error.message);
    return 0; // Fallback to 0 if fails
  }
};

module.exports = { getEmbedding, getSimilarity };
