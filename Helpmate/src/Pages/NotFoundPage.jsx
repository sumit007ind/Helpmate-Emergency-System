import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl mb-4">🚨</div>
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            🏠 Back to Home
          </Link>
          <div className="text-sm text-gray-400">
            <p>Need emergency help?</p>
            <Link 
              to="/sos" 
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Access Emergency SOS →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;