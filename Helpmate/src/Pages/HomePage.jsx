import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to Helpmate Emergency System</h1>
      <p className="text-gray-300 mb-8 text-center max-w-md">
        Your one-stop emergency assistance platform.  
        Please login or sign up to continue.
      </p>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-lg font-semibold"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
