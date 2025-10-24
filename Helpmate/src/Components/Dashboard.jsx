import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserFriends, FaSignOutAlt, FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [dashboardStats] = useState({
    activeAlerts: 0,
    emergencyContacts: 0,
    pendingIssues: 0
  });

  // REMOVED: Authentication redirect - now public

  // Mock data for recent alerts
  const recentAlerts = [
    { id: 1, type: "SOS Alert", time: "2025-09-20 14:35", status: "Resolved" },
    { id: 2, type: "Emergency Contact Added", time: "2025-09-18 11:20", status: "Pending" },
    { id: 3, type: "Health Anomaly", time: "2025-09-17 08:10", status: "Investigating" },
  ];

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">🚨 Helpmate Dashboard</h1>
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <div className="text-right hidden md:block">
                <p className="text-sm text-gray-300">Welcome back,</p>
                <p className="font-semibold">{user.name}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl transition transform hover:scale-105"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link 
                to="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Welcome Section */}
      <section className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8">
        {isAuthenticated && user ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">Welcome back, {user.name}! 👋</h2>
            <p className="text-gray-300">Email: {user.email}</p>
            <p className="text-gray-400 text-sm mt-1">
              Last login: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'First time login'}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-2">Welcome to Helpmate Dashboard! 👋</h2>
            <p className="text-gray-300">Please login to access all features</p>
            <div className="mt-4 flex gap-3">
              <Link 
                to="/login"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
              >
                Login Now
              </Link>
              <Link 
                to="/signup"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-xl transition"
              >
                Create Account
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow hover:scale-105 transition">
          <FaBell className="text-3xl text-yellow-400 mb-3" />
          <h3 className="text-xl font-semibold">Active Alerts</h3>
          <p className="text-2xl font-bold mt-2">{dashboardStats.activeAlerts}</p>
          <Link to="/alerts" className="text-yellow-400 text-sm hover:underline">
            View all alerts →
          </Link>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow hover:scale-105 transition">
          <FaUserFriends className="text-3xl text-green-400 mb-3" />
          <h3 className="text-xl font-semibold">Emergency Contacts</h3>
          <p className="text-2xl font-bold mt-2">{dashboardStats.emergencyContacts}</p>
          <Link to="/contacts" className="text-green-400 text-sm hover:underline">
            Manage contacts →
          </Link>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow hover:scale-105 transition">
          <FaExclamationTriangle className="text-3xl text-red-400 mb-3" />
          <h3 className="text-xl font-semibold">Pending Issues</h3>
          <p className="text-2xl font-bold mt-2">{dashboardStats.pendingIssues}</p>
          <Link to="/alerts" className="text-red-400 text-sm hover:underline">
            Check issues →
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="flex flex-col md:flex-row gap-6 mb-10">
        <Link
          to="/sos"
          className="flex-1 bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-2xl text-center font-semibold text-lg hover:scale-105 transition transform"
        >
          🚨 Emergency SOS Alert
        </Link>
        <Link
          to="/contacts"
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl text-center font-semibold text-lg hover:scale-105 transition transform"
        >
          📞 Manage Emergency Contacts
        </Link>
        <Link
          to="/profile"
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-2xl text-center font-semibold text-lg hover:scale-105 transition transform"
        >
          👤 Update Profile
        </Link>
      </section>

      {/* Recent Alerts Table */}
      <section className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Recent Activity</h3>
          <Link 
            to="/alerts" 
            className="text-blue-400 hover:text-blue-300 text-sm hover:underline"
          >
            View all →
          </Link>
        </div>
        
        {recentAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FaBell className="text-4xl mx-auto mb-3 opacity-50" />
            <p>No recent activity</p>
            <p className="text-sm">Your emergency alerts will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-2 text-gray-300">Type</th>
                  <th className="py-3 px-2 text-gray-300">Time</th>
                  <th className="py-3 px-2 text-gray-300">Status</th>
                  <th className="py-3 px-2 text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentAlerts.map((alert) => (
                  <tr key={alert.id} className="border-b border-gray-800 hover:bg-white/5">
                    <td className="py-3 px-2">{alert.type}</td>
                    <td className="py-3 px-2 text-gray-300">{alert.time}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          alert.status === "Resolved"
                            ? "bg-green-600 text-white"
                            : alert.status === "Pending"
                            ? "bg-yellow-600 text-black"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <Link 
                        to={`/alerts/${alert.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm hover:underline"
                      >
                        View details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Emergency Instructions */}
      <section className="mt-8 bg-red-900/20 border border-red-600/30 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-red-400 mb-3">⚠️ Emergency Instructions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">In case of emergency:</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-300">
              <li>Press the SOS button and hold for 3 seconds</li>
              <li>Your location will be sent to emergency contacts</li>
              <li>Stay calm and wait for help</li>
              <li>Call 911 if immediate assistance is needed</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold mb-2">System Status:</h4>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;