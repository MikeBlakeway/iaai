# IAAI Monorepo

A monorepo for the **Interactive AI Avatar Interface (IAAI)**, designed to integrate a naturalistic AI avatar that supports:

* 🎙️ Voice-to-voice communication with sentiment-driven tone modulation
* 🧠 Locally hosted LLM responses via Ollama
* 🗣️ TTS via OpenVoice or other local models
* 🎬 Image-to-video generation using ComfyUI or AnimateDiff
* 🤖 Agent support via OpenAI Codex using an `AGENTS.md` file

---

## 🗂 Project Structure

```bash
.
├── AGENTS.md
├── Makefile
├── package.json
├── tsconfig.json
├── apps
│   ├── api
│   │   └── image-to-video
│   │       ├── app
│   │       │   ├── api.py
│   │       │   ├── core.py
│   │       │   └── main.py
│   │       ├── assets/              # Local video/image assets (ignored by Git)
│   │       ├── models
│   │       │   └── model_stub.py
│   │       ├── Makefile
│   │       ├── requirements.txt
│   │       └── README.md
│   └── frontend
│       ├── public/
│       ├── src/
│       │   ├── app/                 # Next.js app router
│       │   ├── components/
│       │   ├── hooks/
│       │   ├── layout/
│       │   ├── services/
│       │   ├── theme/
│       │   ├── types/
│       │   └── utils/
│       ├── README.md
│       └── package.json
├── packages
│   ├── llm/                         # Shared LLM logic (OpenAI/Ollama abstraction)
│   ├── rag/                         # Retrieval-augmented generation (optional)
│   ├── shared/                      # Shared types, constants, helpers
│   └── tts/                         # Local TTS model wrappers (e.g., OpenVoice)
```

---

## 🚀 Getting Started

### 1. Clone the Monorepo

```bash
git clone git@github.com:your-user/iaai-monorepo.git
cd iaai-monorepo
```

### 2. Install Dependencies

```bash
npm install # or use pnpm, bun, yarn
```

### 3. Start Frontend & API

```bash
# Run frontend
cd apps/frontend
npm run dev

# Run API backend
cd ../api
make dev  # uses .venv and uvicorn
```

---

## 🤖 Agent Integration

Codex agents can interrogate this repo using `AGENTS.md`, which includes detailed metadata on:

* Tools and endpoints
* Prompt templates
* API contracts
* Project context

---

## 📦 Package Guidance

* **tts/**: OpenVoice, RVC, or Bark wrappers and utils
* **llm/**: Streaming Ollama interface, OpenAI abstraction
* **rag/**: LangChain chains, context stores (Chroma, FAISS)
* **shared/**: TS types, text utilities, parsers, constants

---

## ✅ TODOs

* [x] Frontend: Image upload, action selector, video preview
* [x] Backend: `/generate` endpoint with stub logic
* [ ] Integrate AnimateDiff or ComfyUI via local inference
* [ ] Add audio pipeline (TTS + STT + prosody control)
* [ ] Voice cloning and emotion tuning via OpenVoice
* [ ] Full AGENTS.md coverage for Codex agents

---

## 📄 License

MIT or similar OSS license (to be decided).
