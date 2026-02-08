# Hospital Management System - Backend

The backend API for the Hospital Management System, built with Node.js, Express, and MongoDB.

## 📂 Directory Structure

```
server/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers (Auth, Patients, Appointments, Billing)
│   ├── models/         # Mongoose Data Models
│   ├── routes/         # API Route definitions
│   ├── db.ts           # Database connection logic
│   ├── index.ts        # Entry point
│   └── seed.ts         # Database seeding script
├── .env                # Environment variables (not committed)
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
Create a `.env` file in the root of the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hospital-management
JWT_SECRET=your_super_secret_key
```

### Running the Server
- **Development Mode** (with nodemon):
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  npm start
  ```

### API Endpoints
- **Auth**: `POST /api/auth/login`
- **Patients**: `GET /api/patients`, `POST /api/patients`...
- **Appointments**: `GET /api/appointments`, `POST /api/appointments`...
- **Billing**: `GET /api/billing`, `POST /api/billing`...
