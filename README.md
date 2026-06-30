# Astra-Q Frontend

Frontend for **Astra-Q**, a conversational AI assistant for exploring ISRO/MOSDAC satellite data and remote sensing datasets. Built with React and Vite, authenticated via Firebase.

## Current Features

- **Landing page** with hero section, features, services, FAQ, and footer
- **Login and signup** UI with email/password authentication
- **Firebase Web Auth** integration (email/password sign-in)
- **Auth-protected chat page** — redirects to login if not authenticated
- **Chat UI** with message bubbles, loading state, sidebar with thread list, and multiple modal panels
- **Backend API integration** — all requests go through `VITE_API_BASE_URL` with a Firebase ID token in the `Authorization` header
- **Thread listing** — sidebar fetches and displays the user's threads from the backend on load and after each message

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 + Vite 7 |
| Auth | Firebase Web SDK 11 (`firebase/auth`) |
| UI components | MUI Icons, Bootstrap 5 |
| HTTP | Native `fetch` |
| Build tooling | Vite with `@vitejs/plugin-react-swc` |
| Linting | ESLint 9 with React Hooks and React Refresh plugins |

No router library is used. Page navigation is handled via component state in `App.jsx`.

## Environment Setup

1. Copy the example file and fill in your values:

   ```bash
   cp .env.example .env
   ```

2. Fill in `.env` with your Firebase Web App config:

   ```env
   VITE_FIREBASE_API_KEY=replace_with_firebase_web_api_key
   VITE_FIREBASE_AUTH_DOMAIN=replace_with_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=replace_with_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=replace_with_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=replace_with_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=replace_with_firebase_app_id
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```

   - Firebase values come from **Firebase Console > Project Settings > General > Web App config**.
   - **Email/password sign-in** must be enabled in **Firebase Console > Authentication > Sign-in method**.
   - After changing `.env`, restart the Vite dev server.

## Security Notes

- **Do not commit `.env`** — it is listed in `.gitignore`.
- **Do not place a Firebase Admin SDK `serviceAccountKey.json` in this repo.** This frontend uses the Firebase Web SDK only. Admin credentials belong in the backend.
- Firebase web config values (`apiKey`, `appId`, etc.) are safe to expose in client-side code. They are not the same as backend admin credentials.

## Local Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

The Vite dev server proxies `/api` requests to `http://localhost:8000` (see `vite.config.js`). For production or non-default backends, set `VITE_API_BASE_URL` in `.env`.

## Backend Contract

The frontend expects a backend running at `VITE_API_BASE_URL`. All requests include a Firebase ID token for authentication.

### Send a chat message

```text
POST {VITE_API_BASE_URL}/chat
Headers:
  Content-Type: application/json
  Authorization: Bearer <firebase_id_token>
Body:
  {
    "thread_id": "<thread_id>",
    "message": "<message>"
  }
```

### List threads

```text
GET {VITE_API_BASE_URL}/threads
Headers:
  Authorization: Bearer <firebase_id_token>
```

### Load thread messages

```text
GET {VITE_API_BASE_URL}/thread/{thread_id}
Headers:
  Authorization: Bearer <firebase_id_token>
```

## How to Test Manually

1. Start the backend separately (must be running at the URL in `VITE_API_BASE_URL`).
2. Start the frontend: `npm run dev`.
3. Open the local Vite URL (usually `http://localhost:5173`).
4. Sign up with an email and password.
5. Confirm the user appears in **Firebase Console > Authentication > Users**.
6. Log in and send a chat message.
7. Open browser **DevTools > Network** tab and verify the request to `/chat` includes `Authorization: Bearer ...`.
8. Confirm the backend returns a response and the bot message appears in the UI.

## Project Structure

```
isro_project/
  .env.example          # Environment variable template
  .gitignore
  index.html
  package.json
  vite.config.js        # Vite config with /api proxy
  src/
    main.jsx            # React entry point
    App.jsx             # Page routing and layout
    firebase.js         # Firebase Web SDK init
    AuthContext.jsx      # Auth provider (login, signup, logout, getToken)
    Login.jsx            # Login page
    Signup.jsx           # Signup page
    chat.jsx             # Chat page with sidebar, messages, thread list
    chat.css
    login.css
    signup.css
    App.css
    components/
      Header.jsx
      Hero.jsx
      Features.jsx
      Services.jsx
      FAQ.jsx
      Footer.jsx
      LearnMore.jsx
      SpaceBackground.jsx
      SpaceBackground.css
    assets/
      ...
```

## Known Limitations

- The backend must be running separately. This repo is frontend only.
- All RAG, Neo4j, and data retrieval logic lives in the backend. The frontend only sends messages and displays responses.
- The frontend depends on a valid Firebase Web App configuration. Without it, auth and chat will not work.
- Thread list and thread history depend on the backend implementing the `/threads` and `/thread/{thread_id}` endpoints correctly.
- No offline support or local message caching — messages are fetched from the backend on each thread load.
