from sentence_transformers import SentenceTransformer
import numpy as np

# Load the model globally so it only loads once into memory
model = SentenceTransformer('BAAI/bge-base-en-v1.5')

def generate_embedding(text: str) -> list[float]:
    """Generates an embedding vector for the given text."""
    if not text or not text.strip():
        # Handle empty text
        return np.zeros(768).tolist()
    
    embedding = model.encode(text)
    return embedding.tolist()

def compute_similarity(vec1: list[float], vec2: list[float]) -> float:
    """Computes cosine similarity between two vectors."""
    v1 = np.array(vec1)
    v2 = np.array(vec2)
    
    if np.linalg.norm(v1) == 0 or np.linalg.norm(v2) == 0:
        return 0.0
        
    dot_product = np.dot(v1, v2)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    
    similarity = dot_product / (norm_v1 * norm_v2)
    return float(similarity)
