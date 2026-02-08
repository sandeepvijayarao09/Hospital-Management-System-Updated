# Hospital Management System

A comprehensive, full-stack Hospital Management System designed to streamline healthcare operations. This application manages patients, appointments, billing, and authentication with a modern, responsive user interface.

## 🚀 Features

### Core Functionalities
- **User Authentication**: Secure Login/Logout functionality for administrators.
- **Dashboard**: Real-time overview of total patients, appointments, and revenue.
- **Patient Management**: 
  - Add, Edit, Delete, and View patient records.
  - Search and filter patients.
- **Appointment Scheduling**:
  - Book appointments with real-time patient selection.
  - View and manage appointment statuses (Confirmed, Pending, Cancelled).
- **Billing & Invoicing**:
  - Create invoices for patients.
  - Track payment statuses (Paid, Pending, Overdue).

### Technical Highlights
- **Frontend**: React, TypeScript, Tailwind CSS, Vite.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Security**: JWT Authentication, Password Hashing (bcrypt).

## 🛠️ Tech Stack

### Client (Frontend)
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Server (Backend)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/sandeepvijayarao09/Hospital-Management-System-Updated.git
cd Hospital-Management-System-Updated
```

### 2. Setup Backend
```bash
cd server
npm install
```
**Environment Variables**: Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
**Start Server**:
```bash
npm run dev
```

### 3. Setup Frontend
Open a new terminal:
```bash
cd client
npm install
npm run dev
```

## 🧪 Usage
1. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).
2. Login with the default admin credentials (if seeded):
   - **Email**: `admin@hospital.com`
   - **Password**: `admin`
3. Explore the Dashboard, Patients, Appointments, and Billing sections.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

## 📄 License
This project is open-source and available under the MIT License.
