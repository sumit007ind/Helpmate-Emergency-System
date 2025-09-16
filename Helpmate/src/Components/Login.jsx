import React from "react";

const Login = () => {
  return (
    <div 
      className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black bg-cover bg-center shadow-pink-500/50"
      style={{ backgroundImage: "url('/background.login.png')" }}
    >
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg">
        <h2 className="text-3xl font-bold text-center text-pink-600  mb-4">
          Welcome Back
        </h2>
        
        <form className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-blue-700 text-white font-semibold hover:scale-105 transform transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-pink-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
