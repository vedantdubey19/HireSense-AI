from sentence_transformers import SentenceTransformer
import numpy as np

# Load the model globally so it only loads once into memory
model = SentenceTransformer('BAAI/bge-base-en-v1.5')

def generate_embedding(text: str, is_query: bool = False) -> list[float]:
    """Generates an embedding vector for the given text using chunking and max pooling."""
    if not text or not text.strip():
        # Handle empty text
        return np.zeros(768).tolist()
    
    if is_query:
        # BGE specific instruction for asymmetric retrieval
        text = f"Represent this sentence for searching relevant passages: {text}"
        embedding = model.encode(text)
        norm = np.linalg.norm(embedding)
        if norm > 0:
            embedding = embedding / norm
        return embedding.tolist()
    
    # Split text into 350-word chunks to bypass the 512 token limit for resumes
    words = text.split()
    chunk_size = 350
    chunks = [" ".join(words[i:i+chunk_size]) for i in range(0, max(1, len(words)), chunk_size)]
    
    # Generate embeddings for all chunks
    chunk_embeddings = model.encode(chunks)
    
    # Max pooling to strongly match specialized skills instead of averaging
    doc_embedding = np.max(chunk_embeddings, axis=0)
    
    # L2 Normalization
    norm = np.linalg.norm(doc_embedding)
    if norm > 0:
        doc_embedding = doc_embedding / norm
        
    return doc_embedding.tolist()

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
