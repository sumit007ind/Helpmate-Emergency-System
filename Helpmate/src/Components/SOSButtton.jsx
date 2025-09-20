import React, { useState, useRef } from 'react';

const SOSButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [location, setLocation] = useState(null);
  const countdownInterval = useRef(null);
  const pressTimer = useRef(null);

  // Get user's current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => reject(error)
        );
      } else {
        reject(new Error('Geolocation is not supported'));
      }
    });
  };

  // Start countdown when button is pressed
  const handleMouseDown = async () => {
    setIsPressed(true);
    setCountdown(3);
    
    try {
      const userLocation = await getCurrentLocation();
      setLocation(userLocation);
    } catch (error) {
      console.error('Failed to get location:', error);
      setLocation(null);
    }
    
    // Start 3-second countdown
    let timeLeft = 3;
    countdownInterval.current = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      
      if (timeLeft <= 0) {
        triggerEmergency();
      }
    }, 1000);
  };

  // Cancel countdown if button is released
  const handleMouseUp = () => {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
      countdownInterval.current = null;
    }
    setIsPressed(false);
    setCountdown(0);
  };

  // Trigger emergency alert
  const triggerEmergency = async () => {
    setIsEmergencyActive(true);
    clearInterval(countdownInterval.current);
    setIsPressed(false);
    setCountdown(0);

    const emergencyData = {
      timestamp: new Date().toISOString(),
      location: location,
      userId: localStorage.getItem('userId'), // Assuming user ID is stored
      type: 'SOS_BUTTON_PRESS'
    };

    try {
      // Send emergency alert to backend
      const response = await fetch('/api/alerts/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(emergencyData)
      });

      if (response.ok) {
        console.log('Emergency alert sent successfully');
        // Show success message
        alert('🚨 Emergency alert sent to your contacts!');
      } else {
        throw new Error('Failed to send emergency alert');
      }
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      alert('❌ Failed to send emergency alert. Please try again.');
    }

    // Reset after 5 seconds
    setTimeout(() => {
      setIsEmergencyActive(false);
    }, 5000);
  };

  // Cancel active emergency
  const cancelEmergency = async () => {
    try {
      await fetch('/api/alerts/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId: localStorage.getItem('userId') })
      });
      
      setIsEmergencyActive(false);
      alert('Emergency alert cancelled');
    } catch (error) {
      console.error('Error cancelling emergency:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center font-sans">
      <div className="mb-8">
        <h2 className="text-red-600 text-3xl font-bold mb-3">Emergency SOS</h2>
        <p className="text-gray-600 text-lg">Hold the button for 3 seconds to send emergency alert</p>
      </div>

      {/* Main SOS Button */}
      <div 
        className={`w-48 h-48 rounded-full mx-auto my-6 cursor-pointer flex flex-col items-center justify-center transition-all duration-300 select-none relative border-4 border-white shadow-2xl
          ${isPressed 
            ? 'transform scale-95 bg-gradient-to-br from-red-400 to-red-600 animate-pulse shadow-red-500/50' 
            : isEmergencyActive 
              ? 'bg-gradient-to-br from-green-400 to-green-600 animate-pulse' 
              : 'bg-gradient-to-br from-red-500 to-red-700 hover:scale-105 hover:shadow-3xl'
          }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {countdown > 0 ? (
          <div className="flex flex-col items-center text-white">
            <span className="text-7xl font-bold leading-none">{countdown}</span>
            <span className="text-sm mt-1">Release to cancel</span>
          </div>
        ) : isEmergencyActive ? (
          <div className="flex flex-col items-center gap-3 text-white">
            <span className="text-5xl animate-bounce">🚨</span>
            <span className="text-xl font-bold">ALERT SENT</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="text-5xl text-white">🆘</span>
            <span className="text-2xl font-bold text-white tracking-wider">SOS</span>
          </div>
        )}
      </div>

      {/* Location Info */}
      {location && (
        <div className="my-6 p-4 bg-gray-100 rounded-lg text-gray-700">
          <p>📍 Location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</p>
        </div>
      )}

      {/* Cancel Button */}
      {isEmergencyActive && (
        <button 
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg my-6"
          onClick={cancelEmergency}
        >
          Cancel Emergency
        </button>
      )}

      {/* Instructions */}
      <div className="mt-8 text-left bg-gray-50 p-6 rounded-xl border-l-4 border-red-600">
        <h3 className="text-red-600 text-xl font-bold mb-4">How it works:</h3>
        <ul className="space-y-3">
          <li className="text-gray-700 flex items-start">
            <span className="text-red-600 mr-3">▶</span>
            Press and hold the SOS button
          </li>
          <li className="text-gray-700 flex items-start">
            <span className="text-red-600 mr-3">▶</span>
            Keep holding for 3 seconds
          </li>
          <li className="text-gray-700 flex items-start">
            <span className="text-red-600 mr-3">▶</span>
            Emergency alert will be sent to your contacts
          </li>
          <li className="text-gray-700 flex items-start">
            <span className="text-red-600 mr-3">▶</span>
            Your location will be shared automatically
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SOSButton;