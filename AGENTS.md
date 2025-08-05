# AGENTS.md

This document provides an overview of the architecture, components, models, workflows, and instructions that enable AI agents to collaborate effectively within the monorepo project.

---

## Project Overview

The monorepo currently contains two main applications:

1. **frontend/** (Next.js v15, App Router, TailwindCSS, TypeScript)

   * Web interface for users to interact with AI features
   * Features include: voice-enabled chatbot, image-to-video generation, avatar-based UI

2. **itv-api/** (FastAPI Python backend)

   * API service responsible for handling avatar generation tasks
   * Connects with image-to-video models (AnimateDiff or placeholders)

All subprojects are structured to support eventual deployment and integration with AI agents such as OpenAI Codex.

---

## Monorepo Architecture: iaai

### Root

```bash
.
├── AGENTS.md                 # Agent-focused system documentation
├── Makefile                  # Top-level helper for common commands
├── package.json              # Shared scripts or tooling (optional)
├── tsconfig.json             # Shared TypeScript config for frontend/backend TS code
├── README.md                 # Root-level overview
├── apps/                     # Application-specific code
├── packages/                 # Shared or standalone libraries (LLM, RAG, TTS, etc.)
```

### apps/

```bash
apps/
├── frontend/                 # Next.js 15 UI (main interface)
│   ├── public/               # Static assets (icons, action images, etc.)
│   ├── src/
│   │   ├── app/              # App router pages/api endpoints
│   │   │   ├── video-generator/page.tsx
│   │   │   └── api/          # Internal proxies to Python APIs (e.g., chat, speak, image-to-video)
│   │   ├── components/       # UI components
│   │   ├── hooks/            # React hooks (e.g., useChat, useTextToSpeech)
│   │   ├── layout/           # Layout wrappers
│   │   ├── mock/             # Static mock data
│   │   ├── services/         # API service wrappers (e.g., generateVideo)
│   │   ├── styles/           # CSS/Tailwind
│   │   ├── types/            # TypeScript interfaces (e.g., ChatMessage, StreamChunk)
│   │   └── utils/            # Utilities (e.g., batching, highlight parsing)
│   └── tsconfig.json        # Frontend-specific TypeScript config
├── api/
│   └── image-to-video/       # FastAPI service for AnimateDiff
│       ├── app/
│       │   ├── api.py        # API endpoints
│       │   ├── core.py       # Core business logic
│       │   └── main.py       # FastAPI app instance
│       ├── models/
│       │   └── model_stub.py # Placeholder or inference module
│       ├── assets/           # Temp storage for test/demo files (excluded in .gitignore)
│       ├── requirements.txt  # Python dependencies
│       ├── Makefile          # Developer workflow
│       └── README.md         # API-specific usage guide
```

### packages/

```bash
packages/
├── shared/                   # Shared TypeScript utilities (interfaces, types, helper functions)
├── llm/                      # LLM tooling (OpenAI, Ollama, prompt templates)
├── rag/                      # Retrieval-augmented generation logic (e.g., vector search)
└── tts/                      # Text-to-speech modules (e.g., OpenVoice interface)
```

### Other Adjustments

.DS_Store, **pycache**, and assets/ should be included in the top-level .gitignore.

All README.md files in apps/ and packages/ should be local to their respective context.

Future agents should reference paths as apps/frontend/..., packages/shared/..., etc.

---

## Integrated AI Models

### AnimateDiff (Planned via ComfyUI)

* **Purpose**: Converts a still image and motion prompt into a short video
* **Integration Plan**:

  * Model will run on a locally-hosted ComfyUI instance
  * API endpoint `/generate` will POST an image and action string
  * ComfyUI will generate a video from the image
* **Expected Input**:

  ```json
  {
    "image": <image file>,
    "action": "kung_fu"
  }
  ```

* **Expected Output**:

  * MP4 video file path served back to frontend

### 🎤 OpenVoice (Voice Cloning, Planned)

* **Purpose**: Clone a user's voice and generate speech in that style
* **Features**:

  * Multi-style control (sad, sarcastic, happy, etc.)
  * Offline voice synthesis (no API calls)
* **Integration Plan**:

  * Train a voice profile from user sample
  * Use sentiment analysis to control tone
  * Replace ElevenLabs for TTS

---

## Prompt Patterns & Agent Instructions

When operating Codex or any AI agents over this monorepo:

* Prefer **Next.js App Router** features in the `frontend/`
* Use **TailwindCSS** for styling
* All TTS or voice playback logic lives in `useTextToSpeech.ts`
* Use `SmartTTSBatcher` for streaming sentence-aware voice output
* To add new features to the image-to-video system:

  1. Add a new action in `ActionSelector.tsx`
  2. Connect it to a supported motion template in the backend

---

## Known Constraints & TODOs

* AnimateDiff integration is currently mocked via a video stub (see `model_stub.py`)
* The `.venv` environment and video assets are gitignored
* Future versions will:

  * Integrate OpenVoice as a local TTS system
  * Replace video stubs with ComfyUI-generated outputs

---

## Getting Started with the Monorepo

To run everything locally:

```bash
# Setup backend
cd itv-api
make init  # creates venv
make install  # installs deps
make dev  # launches FastAPI with Uvicorn

# Setup frontend
cd ../frontend
pnpm install
pnpm dev
```

---

For more detailed usage and component guidance, see the `README.md` files inside each subproject.

This AGENTS.md will be expanded as the system evolves.
