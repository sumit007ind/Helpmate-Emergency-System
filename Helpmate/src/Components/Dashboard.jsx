import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaUserFriends, FaSignOutAlt, FaExclamationTriangle } from "react-icons/fa";

const Dashboard = () => {
  // ✅ Dummy User Data (replace with API later)
  const user = {
    name: "sumit sharma",
    email: "sumit123@gmail.com",
  };

  const recentAlerts = [
    { id: 1, type: "SOS Alert", time: "2025-09-20 14:35", status: "Resolved" },
    { id: 2, type: "Emergency Contact Added", time: "2025-09-18 11:20", status: "Pending" },
    { id: 3, type: "Health Anomaly", time: "2025-09-17 08:10", status: "Investigating" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">🚨 Helpmate Dashboard</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl transition">
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* USER INFO */}
      <section className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-2">Welcome, {user.name} 👋</h2>
        <p className="text-gray-300">Email: {user.email}</p>
      </section>

      {/* STATS CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow hover:scale-105 transition">
          <FaBell className="text-3xl text-yellow-400 mb-3" />
          <h3 className="text-xl font-semibold">Active Alerts</h3>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow hover:scale-105 transition">
          <FaUserFriends className="text-3xl text-green-400 mb-3" />
          <h3 className="text-xl font-semibold">Emergency Contacts</h3>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow hover:scale-105 transition">
          <FaExclamationTriangle className="text-3xl text-red-400 mb-3" />
          <h3 className="text-xl font-semibold">Pending Issues</h3>
          <p className="text-2xl font-bold mt-2">2</p>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="flex flex-col md:flex-row gap-6 mb-10">
        <Link
          to="/alert"
          className="flex-1 bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-2xl text-center font-semibold text-lg hover:scale-105 transition"
        >
          🚨 Trigger SOS Alert
        </Link>
        <Link
          to="/contacts"
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl text-center font-semibold text-lg hover:scale-105 transition"
        >
          ➕ Add Emergency Contact
        </Link>
      </section>

      {/* RECENT ALERTS TABLE */}
      <section className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg overflow-x-auto">
        <h3 className="text-xl font-bold mb-4">Recent Alerts</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Type</th>
              <th className="py-2">Time</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentAlerts.map((alert) => (
              <tr key={alert.id} className="border-b border-gray-800 hover:bg-white/5">
                <td className="py-2">{alert.type}</td>
                <td className="py-2">{alert.time}</td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
