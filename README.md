<div align="center">

# *Sera*

**Full-stack AI chat app · Gemini-powered · Streaming · Custom API keys**

[![Live Demo](https://img.shields.io/badge/Live-sera--blue.vercel.app-black?style=flat-square)](https://sera-blue.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-mukhtaransarii-333?style=flat-square&logo=github)](https://github.com/mukhtaransarii/Sera)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_API-4285F4?style=flat-square&logo=google&logoColor=white)

</div>

---

Here's the updated sections:

---

## Features

| | Feature | Description |
|---|---|---|
| ⌗ | **Per-chat routing** | Each conversation gets its own `/chat/:id` — shareable, navigable, state-isolated |
| ✦ | **AI-generated titles** | Gemini auto-names chats on the first message, streamed back inline |
| ⬡ | **System prompt** | Customise AI persona per session with prebuilt suggestions or write your own |
| ⏹ | **Abort / stop** | Cancel any in-flight generation mid-stream, input reverts to send mode instantly |
| ⌘ | **Custom API key** | Paste your own Gemini key via dialog — includes a direct link to create one |
| ◈ | **New user homescreen** | Onboarding screen shown only on first visit, skips to chat on return |
| ⊕ | **Auth & guest mode** | Full signup/login flow — guests get a UUID session, users persist chats to DB |
| ⊟ | **Chat management** | Rename or delete any chat inline from the sidebar with instant optimistic update |
| ⇄ | **Persistent history** | Logged-in users load chats from DB on return; guests keep history in localStorage |
| ◎ | **Model selector** | Switch Gemini models per session, saved to localStorage across refreshes |

---

## Project Structure

```
Sera/
├── backend/
│   ├── src/controllers/
│   │   ├── chat.controller.ts   # createNewChat, chatController, fetchAllChats
│   │   │                        # saveChat, deleteChat, renameChat
│   │   └── auth.controller.ts   # signup, login, logout, me
│   ├── src/models/
│   │   ├── chat.model.ts
│   │   └── user.model.ts
│   ├── src/validation/          # zod schemas
│   ├── src/middleware/          # authMiddleware, optionalAuth
│   └── src/routes/
├── frontend/
│   ├── src/components/          # MessageBubble, InputBox, SideBar, Dialog, Logo
│   ├── src/context/
│   │   ├── useChatStore.ts      # zustand — chats, streaming, sendMessage, loadChat
│   │   └── useAuth.ts           # zustand — user, login, signup, logout, me
│   ├── src/config/
│   │   ├── api.chat.ts          # createNewChat, genAiResponse, fetchAllChats, saveChat
│   │   └── api.auth.ts          # login, signup, logout, me
│   ├── src/pages/
│   │   ├── ChatScreen.tsx       # /chat and /chat/:id
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Home.tsx             # first visit onboarding
│   │   └── HomeReset.tsx
│   ├── src/types/               # shared TypeScript types
│   ├── src/constants/           # models list, defaults
│   └── src/hooks/               # useLocalStorage
└── README.md
```

## Tech Stack

**Frontend**
`React` `TypeScript` `Zustand` `Tailwind CSS` `Vite`

**Backend**
`Node.js` `Express` `TypeScript` `Gemini API` `Zod`

---

## Getting Started

### Prerequisites
- Node.js (LTS)
- npm or yarn
- Gemini API key → [Get one here](https://aistudio.google.com/app/apikey)

### Backend

```bash
cd backend
npm install
```

Create `.env`:
```env
GEMINI_API_KEY=your_key_here
MONGO_URI=your-mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
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

## Contributing

```bash
git fork → git checkout -b feature/name → git commit → git push → open PR
```

---

## License

No license currently assigned. Contact maintainer before reuse.

---

<div align="center">

Built by [Mukhtar Ansari](https://github.com/mukhtaransarii)

</div>
