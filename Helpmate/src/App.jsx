import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import SOSButton from "./Components/SOSButton";
import AlertPage from "./Pages/AlertPage";
import ContactsPage from "./Pages/ContactsPage";
import NotFoundPage from "./Pages/NotFoundPage";

// Optional: Protected Route component for authenticated pages
const ProtectedRoute = ({ children }) => {
  // Add authentication logic here later
  // For now, return children directly
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
         
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sos" 
            element={
              <ProtectedRoute>
                <SOSButton />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contacts" 
            element={
              <ProtectedRoute>
                <ContactsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/alerts" 
            element={
              <ProtectedRoute>
                <AlertPage />
              </ProtectedRoute>
            } 
          />
          
         
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;