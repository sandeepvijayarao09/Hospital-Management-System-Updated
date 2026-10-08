# Hospital Management System - Server

Express 5 + Mongoose API. See the [root README](../README.md) for full setup.

```
server/
├── src/
│   ├── app.ts          # Express app (routes + middleware), no listen; imported by tests
│   ├── index.ts        # Entry point: checks config, connects DB, seeds, listens
│   ├── config.ts       # Required env (JWT_SECRET) with no fallbacks
│   ├── db.ts           # MongoDB connection, optional in-memory mode
│   ├── seed.ts         # Demo users and sample data (dev only)
│   ├── middleware/     # JWT `protect` middleware
│   ├── controllers/    # Request handlers (BaseController provides CRUD)
│   ├── models/         # User, Patient, Doctor, Appointment, Billing
│   └── routes/
├── tests/              # Vitest + supertest API tests
└── .env.example
```

```bash
npm install
cp .env.example .env   # set JWT_SECRET
npm run dev:memory     # in-memory MongoDB + demo data on :5001
npm run dev            # uses MONGO_URI
npm test               # API tests
npm run build && npm start
```
