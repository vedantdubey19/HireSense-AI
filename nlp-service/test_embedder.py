from embedder import generate_embedding

def test():
    print("Loading model and generating embedding...")
    emb = generate_embedding("test string for embedding")
    print(f"Embedding generated! Length: {len(emb)}")
    
    emb_empty = generate_embedding("")
    print(f"Empty embedding generated! Length: {len(emb_empty)}")

if __name__ == "__main__":
    test()
