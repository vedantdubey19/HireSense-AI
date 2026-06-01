from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from embedder import generate_embedding, compute_similarity

app = FastAPI(title="HireSense NLP Service")

class TextRequest(BaseModel):
    text: str
    is_query: bool = False

class SimilarityRequest(BaseModel):
    vec1: List[float]
    vec2: List[float]

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/embed")
def embed_text(req: TextRequest):
    embedding = generate_embedding(req.text, req.is_query)
    return {"embedding": embedding}

@app.post("/similarity")
def similarity(req: SimilarityRequest):
    score = compute_similarity(req.vec1, req.vec2)
    return {"score": score}
