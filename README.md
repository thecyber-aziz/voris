<div align="center">

# *Sera*

**Full-stack AI chat app · Gemini-powered · Streaming · Custom API keys**

[![Live Demo](https://img.shields.io/badge/Live-sera--blue.vercel.app-black?style=flat-square)](https://sera-blue.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-mukhtaransarii-333?style=flat-square&logo=github)](https://github.com/mukhtaransarii/Sera)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_API-4285F4?style=flat-square&logo=google&logoColor=white)

</div>

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

---

## Tech Stack

**Frontend**
`React` `TypeScript` `Zustand` `Tailwind CSS` `Vite`

**Backend**
`Node.js` `Express` `TypeScript` `Gemini API` `Zod`

---

## Project Structure

```
Sera/
├── backend/
│   ├── src/controllers/     # chatController, validateKey
│   ├── src/validation/      # zod schemas
│   └── src/routes/
├── frontend/
│   ├── src/components/      # chat, dialog, homescreen
│   ├── src/store/           # zustand state
│   └── src/pages/           # /chat, /chat/:id
└── README.md
```

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
