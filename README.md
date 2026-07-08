# Astra-Q Frontend

Space-themed React UI for the Astra-Q satellite data assistant.

## Features

- **Chat interface** — send questions, get AI answers with sources
- **Knowledge Graph Explorer** — interactive canvas visualization of satellite/product/parameter relationships
- **Satellite Visualizer** — browse satellites and their products, parameters, regions
- **Voice input** — speak your questions via Web Speech API
- **File upload** — attach PDF/DOCX/TXT files for context
- **Thread management** — create, open, delete, favorite conversations
- **Search** — full-text search across all past messages
- **Settings** — display name, theme, language preferences (persisted to Firestore)
- **Feedback** — star rating + text feedback submission
- **Firebase Auth** — email/password login and signup
- **Protected routes** — chat requires authentication

## Tech Stack

| Component | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 (SWC) |
| Routing | React Router v7 |
| Styling | Bootstrap 5 + MUI Icons + custom CSS |
| State | React hooks (no Redux) |
| Auth | Firebase Auth (email/password) |

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:5173
```

The dev server proxies `/api` to `http://localhost:8000` (the backend).

## Routes

| Path | Page | Auth Required |
|---|---|---|
| `/` | Landing page (Hero, Features, Services, FAQ, Footer) | No |
| `/learn-more` | Architecture and feature details | No |
| `/login` | Login form | No |
| `/signup` | Signup form | No |
| `/chat` | Chat interface | Yes |
| `/chat/:threadId` | Chat with specific thread | Yes |

## Environment

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Backend API URL (default: proxied via Vite) |
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

## Build

```bash
npm run build
# Output: dist/
# Bundle: ~527 KB
```

## Deploy

Vercel or Netlify:
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` and all `VITE_FIREBASE_*` vars
