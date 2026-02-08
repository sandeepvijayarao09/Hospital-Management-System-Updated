# Hospital Management System - Frontend

The frontend user interface for the Hospital Management System, built with React, TypeScript, and Tailwind CSS.

## 📂 Project Structure

```
client/
├── src/
│   ├── api/            # Axios setup and API calls
│   ├── components/     # Reusable UI components (Buttons, Modals, etc.)
│   ├── context/        # React Context (Auth State)
│   ├── pages/          # Application Pages (Dashboard, Patients, etc.)
│   ├── App.tsx         # Main App component & Routing
│   └── main.tsx        # Entry point
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- The backend server must be running on port 5000 (default)

### Installation
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Client
- **Development Server**:
  ```bash
  npm run dev
  ```
  Access the app at `http://localhost:5173`.

- **Linting**:
  ```bash
  npm run lint
  ```

- **Build for Production**:
  ```bash
  npm run build
  ```

## 🎨 Tech Stack
- **React**: UI Library
- **TypeScript**: Static Typing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Next Generation Frontend Tooling
- **React Router**: Client-side routing
