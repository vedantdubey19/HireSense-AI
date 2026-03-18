# 🚀 HireSense AI  

An AI-powered recruitment engine that automates resume screening using NLP and embedding-based semantic matching to intelligently rank candidates.

---

## 📌 Overview  
HireSense AI streamlines the hiring process by replacing traditional keyword-based filtering with context-aware candidate matching. It processes large volumes of resumes and ranks candidates based on their relevance to job descriptions, reducing manual effort significantly.

---

## ⚙️ Features  
- 🔍 Semantic Job Matching using embeddings  
- 📄 Automated Resume Screening for 5,000+ candidates  
- 📊 Candidate Ranking System based on relevance score  
- ⚡ ~70% Reduction in Manual Shortlisting Time  
- 🌐 Full-Stack MERN Application  
- 🐳 Dockerized for easy deployment  

---

## 🛠️ Tech Stack  

**Frontend:** React.js  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**AI/ML:** NLP, Embeddings (semantic similarity)  
**DevOps:** Docker  

---

## 🧠 How It Works  

1. Upload resumes and job descriptions  
2. Preprocess text using NLP techniques  
3. Convert text into embeddings  
4. Compute similarity between candidates and job roles  
5. Rank candidates based on matching score  

---

## 📂 Project Structure  HireSense-AI/
│── client/        # React frontend
│── server/        # Node.js backend
│── models/        # Database schemas
│── routes/        # API routes
│── utils/         # NLP & embedding logic
│── docker/        # Docker configuration
│── README.md


---

## 🚀 Installation & Setup  

### 1. Clone the repository  
```bash
git clone https://github.com/vedantdubey19/HireSense-AI.git
cd HireSense-AI

2. Install dependencies
npm install
cd client && npm install

3. Setup environment variables

Create a .env file in the root directory:

MONGO_URI=your_mongodb_connection
PORT=5000


4. Run the application

npm run dev


🐳 Run with Docker
docker build -t hiresense-ai .
docker run -p 5000:5000 hiresense-ai

🌟 Future Improvements
	•	AI-based interview assistant
	•	Advanced analytics dashboard
	•	Bias detection in hiring
	•	Integration with ATS systems

⸻

🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

⸻

📜 License

This project is licensed under the MIT License.

⸻

👨‍💻 Author

Vedant Dubey
GitHub: https://github.com/vedantdubey19
