# HireSenseAi
> AI-powered recruitment engine by vedant Dubey

## Quick Start
```bash
git clone <repo>
cd hiresense-ai
cp .env.example .env
docker-compose up --build
```

## Access
- Frontend  → http://localhost:3000
- Backend   → http://localhost:5555
- NLP API   → http://localhost:8000
- MongoDB   → mongodb://localhost:27017

## How It Works
1. Paste a job description and click "Set Job Description"
2. Drag and drop candidate resumes (PDF or DOCX)
3. Click "Run Screening Pipeline"
4. HireSense embeds all resumes + job description using sentence-transformers (all-MiniLM-L6-v2)
5. Cosine similarity ranks every candidate
6. Results appear ranked in the dashboard in real time
