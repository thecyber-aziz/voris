Sera

Live Demo


---

About

Sera is a full-stack TypeScript application with custom API key support and an interactive dialog-based UI. It combines a modern frontend with a lightweight Node.js backend powered by Express and integrates the GEMINI API for AI functionality.


---

Tech Stack

Frontend

React.js

TypeScript

Zustand

Tailwind CSS


Backend

Node.js

Express.js

TypeScript



---

Features

🔑 Custom API key support (user-provided keys)

💬 Interactive dialog component for chat-style UX

⚡ Fast full-stack TypeScript architecture

🔄 Seamless frontend–backend integration

🤖 GEMINI API integration for AI responses



---

Project Structure

Sera/ ├── backend/        Server-side API (Express + TS) ├── frontend/       Client-side app (React + TS) └── README.md


---

Getting Started

Prerequisites

Node.js (LTS recommended)

npm or yarn



---

Installation

Clone the repository: git clone https://github.com/mukhtaransarii/Sera.git
cd Sera


---

Backend Setup

cd backend
npm install

Create .env file: GEMINI_API_KEY=your_key_here
PORT=3000
NODE_ENV=development

Run backend: npm run dev


---

Frontend Setup

cd frontend
npm install

Create .env file: VITE_BACKEND_URI=http://localhost:3000

Run frontend: npm run dev


---

Usage

1. Open frontend in browser (usually http://localhost:5173 or 3000 depending on setup)


2. Enter your API key in the dialog


3. Start interacting with the AI system




---

Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway / VPS


Live: https://sera-blue.vercel.app


---

Contributing

Fork the repo

Create feature branch

Commit changes

Push and open PR



---

License

No license currently assigned. Contact maintainer before reuse.


---

Author

Built by Mukhtar Ansari
GitHub: https://github.com/mukhtaransarii
