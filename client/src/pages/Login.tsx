import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      login(response.data);
      navigate("/");
    } catch (err: any) {
      setError("Invalid credentials");
    }
  };

  const handleDemoLogin = (role: "admin" | "doctor" | "patient") => {
    const demoUser: any = {
      _id: `demo-${role}`,
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: `${role}@hospital.com`,
      role: role,
      token: `demo-token-${role}`,
    };
    login(demoUser);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-96">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary-600 mb-2">MediCare</h1>
          <h2 className="text-lg font-medium text-gray-900">Welcome Back</h2>
        </div>

        {error && (
          <div className="bg-gray-100 text-gray-600 border border-gray-200 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="mb-8 space-y-3">
          <p className="text-xs text-primary-400 uppercase font-semibold text-center mb-3 tracking-wider">
            Select Demo Role
          </p>
          <Button
            onClick={() => handleDemoLogin("admin")}
            variant="outline"
            className="w-full justify-start pl-4 border-primary-100 text-gray-600 hover:bg-primary-50"
            size="lg"
          >
            <span className="w-2 h-2 rounded-full bg-primary-600 mr-3"></span>
            Login as Admin
          </Button>
          <Button
            onClick={() => handleDemoLogin("doctor")}
            variant="outline"
            className="w-full justify-start pl-4 border-primary-100 text-gray-600 hover:bg-primary-50"
            size="lg"
          >
            <span className="w-2 h-2 rounded-full bg-primary-400 mr-3"></span>
            Login as Doctor
          </Button>
          <Button
            onClick={() => handleDemoLogin("patient")}
            variant="outline"
            className="w-full justify-start pl-4 border-primary-100 text-gray-600 hover:bg-primary-50"
            size="lg"
          >
            <span className="w-2 h-2 rounded-full bg-primary-300 mr-3"></span>
            Login as Patient
          </Button>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-xs text-gray-400 uppercase">
            Or login with email
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
