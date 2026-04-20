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

```markdown
## Features

| | Feature | Description |
|---|---|---|
| ⌗ | **Per-chat routing** | Each conversation gets its own `/chat/:id` — shareable, navigable, state-isolated |
| ✦ | **AI-generated titles** | Auto-names chats on first message using a fast LLM call, silently falls back to "New Chat" |
| ⬡ | **System prompt** | Customise AI persona per session with prebuilt suggestions or write your own |
| ⏹ | **Abort / stop** | Cancel any in-flight generation mid-stream, input reverts to send mode instantly |
| ⌘ | **Multi API key manager** | Save multiple Groq keys with labels, validate on add, switch active key anytime |
| ◈ | **New user homescreen** | Onboarding screen shown only on first visit, skips to chat on return |
| ⊕ | **Auth & guest mode** | Full signup/login flow — guests get a UUID session, users persist chats to DB |
| ⊟ | **Chat management** | Rename or delete any chat via `...` dropdown in sidebar with instant optimistic update |
| ⇄ | **Persistent history** | Logged-in users load chats from DB on return; guests keep history in localStorage |
| ◎ | **Model selector** | Switch between Groq models per session, saved to localStorage across refreshes |
| ⚡ | **Groq-powered** | Runs on Groq's inference API — ultra-fast streaming with models like Llama, Mixtral, Qwen |
| ◐ | **BYOK** | Bring your own Groq API key — your key, your quota, your usage |

---

## Project Structure

```
Sera/
├── backend/
│   ├── src/ai/
│   │   ├── groq.ts              # groqStream — streaming handler
│   │   └── index.ts             # streamAI — provider switch (swap LLM here)
│   ├── src/controllers/
│   │   ├── chat.controller.ts   # createNewChat, chatController, fetchAllChats
│   │   │                        # saveChatMessages, deleteChatController, renameChatController
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
│   │   ├── useChatStore.ts      # zustand — chats, streaming, newChatId, sendMessage, loadChat
│   │   └── useAuth.ts           # zustand — user, loading, login, signup, logout, me
│   ├── src/config/
│   │   ├── api.chat.ts          # createNewChat, genAiResponse, fetchAllChats, saveChat
│   │   │                        # deleteChatApi, renameChatApi, validateApiKey
│   │   └── api.auth.ts          # login, signup, logout, me
│   ├── src/pages/
│   │   ├── ChatScreen.tsx       # /chat and /chat/:id — URL is source of truth
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Home.tsx             # first visit onboarding
│   │   └── HomeReset.tsx
│   ├── src/types/               # shared TypeScript types
│   ├── src/constants/           # Groq models list, defaultModel, defaultSystemPrompt
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
