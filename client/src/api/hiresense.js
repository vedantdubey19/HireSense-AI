import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://hiresense-ai-1-0dzz.onrender.com/api';

const api = axios.create({
  baseURL: API_URL
});

export const uploadResumes = async (files) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append('resumes', file);
  });
  
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const setJobDescription = async (title, description) => {
  const response = await api.post('/jobs', { title, description });
  return response.data;
};

export const getCandidates = async () => {
  const response = await api.get('/candidates');
  return response.data;
};

export const clearCandidates = async () => {
  const response = await api.delete('/candidates');
  return response.data;
};
