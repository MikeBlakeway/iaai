# Interactive AI Avatar Interface (IAAI)

An interactive UI prototype for a web-based avatar application that connects to a Large Language Model (LLM), synthesizes speech, and renders responses through a lifelike animated avatar. This repository implements a frontend-first approach using **Next.js**, **TailwindCSS**, and **TypeScript**.

---

## 🚀 Features

- ✨ Clean, responsive UI scaffold using TailwindCSS
- 🧠 Simulated avatar chat interface (mocked backend)
- 🗨️ Live-rendered chat messages with user/LLM threading
- 🔊 Placeholder for future speech synthesis integration
- 🧑‍🎤 Avatar display section for Ready Player Me integration

---

## 🧱 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org)
- **Styling**: [TailwindCSS](https://tailwindcss.com)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **UI**: Responsive layout with modular components

---

## 📁 Folder Structure

```bash
src/
├── app/
│   ├── page.tsx               // Main app page
│   └── api/
│       ├── chat/              // POST /api/chat — ChatGPT response mock
│       └── speak/             // POST /api/speak — TTS audio mock
├── components/                // UI components
│   ├── Header.tsx
│   ├── Avatar.tsx
│   ├── ChatArea.tsx
│   └── InputBar.tsx
├── layout/
│   └── Layout.tsx
├── mock/
│   └── chatMock.ts
└── styles/
└── globals.css
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js `>= 18`
- Yarn (preferred)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/iaai-ui.git
cd iaai-ui

# Install dependencies
yarn install

# Start the dev server
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📤 API Routes

| Endpoint          | Description                         |
| ----------------- | ----------------------------------- |
| `POST /api/chat`  | Simulates ChatGPT-style response    |
| `POST /api/speak` | Simulates speech synthesis response |

> These endpoints return mocked data and are ready to be replaced with real API calls to OpenAI and Eleven Labs.

---

## 📌 Next Steps

- ✅ Finalize mock-based rendering workflow
- 🔄 Replace `/api/chat` with OpenAI API integration
- 🔈 Connect `/api/speak` to Eleven Labs / Google TTS
- 🧑‍🎨 Embed avatar via Ready Player Me with lip sync
- 🧠 Implement RAG-based context injection via LangChain

---

## 🔐 Environment Variables

When integrating real APIs, create a `.env.local` file:

```env
OPENAI_API_KEY=your-key-here
ELEVENLABS_API_KEY=your-key-here
```

Use `process.env` in your server-side handlers to securely access secrets.

---

## 👨‍💻 Author

Created by [@Mike](https://github.com/MikeBlakeway) — built for rapid prototyping and LLM experimentation.

---

## 📄 License

MIT License. Use freely with attribution.
