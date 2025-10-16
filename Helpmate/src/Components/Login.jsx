import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login, loading, error, isAuthenticated, clearErrors } = useAuth();
  const navigate = useNavigate();

  // Clear errors when component mounts
  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (error) {
      clearErrors();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(formData);
      // Navigate will happen automatically via the useEffect above
    } catch (err) {
      // Error is already set in context
      console.error('Login failed:', err);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black bg-cover bg-center shadow-pink-500/50"
      style={{ backgroundImage: "url('/background.login.png')" }}
    >
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-4">
          Welcome Back
        </h2>

        {/* Error Message - Only show when there's an error from login attempt */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 backdrop-blur border border-red-500/30">
            <p className="text-red-200 text-sm text-center">{error}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-blue-700 text-white font-semibold transform transition duration-300 flex items-center justify-center ${
              loading 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:scale-105'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
       