# IAAI Monorepo

A monorepo for the **Interactive AI Avatar Interface (IAAI)**, designed to integrate a naturalistic AI avatar that supports:

* 🎙️ Voice-to-voice communication with sentiment-driven tone modulation
* 🧠 Locally hosted LLM responses via Ollama
* 🗣️ TTS via OpenVoice or other local models
* 🎬 Image-to-video generation using AnimateDiff (mocked via ComfyUI `model_stub.py`)
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
│   │       │   └── model_stub.py    # AnimateDiff mock model
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
cd ../api/image-to-video
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
* **apps/api/image-to-video/**: AnimateDiff-based image-to-video API (currently mocked via `model_stub.py`), planned ComfyUI support
* Future AI model integrations and shared logic will be added under `packages/`

---

## ✅ TODOs

* [x] Frontend: Image upload, action selector, video preview
* [x] Backend: `/generate` endpoint with stub logic for AnimateDiff
* [ ] Integrate full AnimateDiff inference pipeline (currently mocked)
* [ ] Add ComfyUI integration for image-to-video generation
* [ ] Add audio pipeline (TTS + STT + prosody control)
* [ ] Voice cloning and emotion tuning via OpenVoice
* [ ] Complete AGENTS.md coverage for Codex agents

---

## 📄 License

MIT or similar OSS license (to be decided).
