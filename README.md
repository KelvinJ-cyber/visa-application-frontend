# Visa Application (Frontend)

A responsive React frontend for a visa application system. This repository contains the user-facing application implemented with Vite, Tailwind, and a set of reusable UI components.

**Note:** The Admin Dashboard is coming soon — UI scaffolding exists in `src/admin`, but full admin features are planned for a follow-up release.

---

## Features

- Public landing pages and responsive header/navigation
- User authentication (Sign in, Register, Reset Password)
- User dashboard with application pages (apply, documents, profile)
- Reusable UI components (dialogs, inputs, buttons, avatar, alerts)
- API integration powered by Axios (`src/services/axios.js`)

## Technology stack

- React 19 (JSX)
- Vite (dev server and build)
- Tailwind CSS for utility-first styling
- Radix UI primitives used within custom UI components
- React Router for client-side routing
- Axios for HTTP requests
- Sonner for toast notifications
- ESLint and Prettier for code quality

## Getting started (Windows PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

4. Lint the project

```powershell
npm run lint
```

## Environment & configuration

- Check `src/services/axios.js` for how the API base URL is configured. You may need to point the axios base URL to your backend (for example `http://localhost:8080` during development).
- Environment variables are not standardized in this repo; add a `.env` or update `services/axios.js` if you need custom endpoints.

## Important folders

- `src/` — application source
  - `auth/` — authentication pages (login, register, reset flows)
  - `components/` — shared UI components and dialogs
  - `user/` — user dashboard pages and sub-pages
  - `admin/` — admin scaffold (coming soon)
  - `services/` — axios instance and API helpers
  - `styles/` — global Tailwind/CSS

## Development notes

- Dialog components are controlled via `open` and `onOpenChange` props (boolean + setter). Keep their state separate to avoid multiple modals opening at once.
- Some files were adapted from Next.js examples — e.g., `next/link` was replaced with `react-router-dom` Link in landing components. If you see `use client` or Next-specific patterns, replace or remove them when running under Vite.
- When adding routes, update `src/routers/AppRoutes.jsx` to include new pages.

## Contributing

1. Fork the repository and create a feature branch.
2. Open a pull request with a clear description and screenshots for UI changes.

## Coming soon

- Admin Dashboard: full admin UI for managing applications and users (coming soon).

---
