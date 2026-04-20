<div align="center">

# Sera

**Full-stack AI chat app · Groq-powered · Streaming · Multi-key BYOK**

[![Live Demo](https://img.shields.io/badge/Live-sera--blue.vercel.app-black?style=flat-square)](https://sera-blue.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-mukhtaransarii-333?style=flat-square&logo=github)](https://github.com/mukhtaransarii/Sera)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_API-orange?style=flat-square)

</div>

---

## Features

| | Feature | Description |
|---|---|---|
| ⌗ | **Per-chat routing** | Each conversation gets its own `/chat/:id` — shareable, navigable, state-isolated |
| ✦ | **AI-generated titles** | Auto-names chats on first message, silently falls back to "New Chat" on limit |
| ⬡ | **System prompt** | Customise AI persona per session with prebuilt suggestions or write your own |
| ⏹ | **Abort / stop** | Cancel any in-flight generation mid-stream instantly |
| ⌘ | **Multi API key manager** | Save multiple Groq keys with labels, validate on add, switch active key anytime |
| ◈ | **New user homescreen** | Onboarding screen shown only on first visit, skips to chat on return |
| ⊕ | **Auth & guest mode** | Full signup/login flow — guests get a UUID session, users persist chats to DB |
| ⊟ | **Chat management** | Rename or delete any chat via `...` dropdown in sidebar with instant optimistic update |
| ⇄ | **Persistent history** | Logged-in users load chats from DB; guests keep history in localStorage |
| ◎ | **Model selector** | Switch between Groq models per session, saved to localStorage across refreshes |
| ⚡ | **Groq-powered** | Ultra-fast streaming with Llama, Mixtral, Qwen, DeepSeek and more |
| ◐ | **BYOK** | Bring your own Groq API key — your key, your quota, your usage |

---

## Tech Stack

**Frontend** — `React` `TypeScript` `Zustand` `Tailwind CSS` `Vite`

**Backend** — `Node.js` `Express` `TypeScript` `MongoDB` `Groq SDK` `Zod`

---

## Project Structure

```
Sera/
├── backend/
│   ├── src/
│   │   ├── ai/
│   │   │   ├── groq.ts              # groqStream — handles streaming response
│   │   │   └── index.ts             # streamAI — provider switch (swap LLM here)
│   │   ├── controllers/
│   │   │   ├── chat.controller.ts   # createNewChat, chatController, fetchAllChats
│   │   │   │                        # saveChatMessages, deleteChatController, renameChatController
│   │   │   └── auth.controller.ts   # signup, login, logout, me
│   │   ├── models/
│   │   │   ├── chat.model.ts
│   │   │   └── user.model.ts
│   │   ├── validation/              # zod schemas
│   │   ├── middleware/              # authMiddleware, optionalAuth
│   │   └── routes/
│
├── frontend/
│   ├── src/
│   │   ├── components/              # MessageBubble, InputBox, SideBar, Dialog, Logo
│   │   ├── context/
│   │   │   ├── useChatStore.ts      # zustand — chats, streaming, newChatId, sendMessage, loadChat
│   │   │   └── useAuth.ts           # zustand — user, loading, login, signup, logout, me
│   │   ├── config/
│   │   │   ├── api.chat.ts          # createNewChat, genAiResponse, fetchAllChats
│   │   │   │                        # saveChat, deleteChatApi, renameChatApi, validateApiKey
│   │   │   └── api.auth.ts          # login, signup, logout, me
│   │   ├── pages/
│   │   │   ├── ChatScreen.tsx       # /chat and /chat/:id — URL is source of truth
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── Home.tsx             # first-visit onboarding
│   │   │   └── HomeReset.tsx
│   │   ├── types/                   # shared TypeScript types
│   │   ├── constants/               # Groq models list, defaultModel, defaultSystemPrompt
│   │   └── hooks/                   # useLocalStorage
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js LTS
- MongoDB connection string
- Groq API key → [Get one free](https://console.groq.com/keys)

### Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_BACKEND_URI=http://localhost:3000
```

```bash
npm run dev
# opens at http://localhost:5173
```

---

## Deployment

| Layer | Platform |
|---|---|
| Frontend | Vercel / Netlify |
| Backend | Render / Railway / VPS |

---

## License

No license currently assigned. Contact maintainer before reuse.

---

<div align="center">

Built by [Mukhtar Ansari](https://github.com/mukhtaransarii)

</div>
