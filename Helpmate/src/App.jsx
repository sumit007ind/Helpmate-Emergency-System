import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./Pages/HomePage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import SOSButton from "./Components/SOSButton";
import AlertPage from "./Pages/AlertPage";
import ContactsPage from "./Pages/ContactsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Now Public - No Authentication Required */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sos" element={<SOSButton />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/alerts" element={<AlertPage />} />
            
            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;