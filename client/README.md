# Hospital Management System - Client

React 19 + TypeScript + Vite + Tailwind CSS. See the [root README](../README.md) for full setup.

```
client/src/
├── api/axios.ts       # Axios instance: attaches the JWT, redirects to /login on 401
├── context/           # Auth state (persisted in localStorage)
├── components/        # Layout and UI primitives
└── pages/             # Login, Dashboard, Patients, Appointments, Billing
```

```bash
npm install
npm run dev     # http://localhost:5173, proxies /api to http://localhost:5001
npm run build
```

The client reads no environment variables. The API address is set by the dev proxy in `vite.config.ts`.
