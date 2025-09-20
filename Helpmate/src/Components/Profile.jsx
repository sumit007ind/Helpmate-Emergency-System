import React, { useState } from 'react';

const ProfileDebug = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'sumit sharma',
    email: 'sumit@example.com',
    phone: '123-456-7890',
    address: '123 Main Street',
    bloodGroup: 'O+',
    medicalConditions: 'None',
    allergies: 'None',
    emergencyMessage: 'Emergency contact message'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Field changed:', name, '=', value); 
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saving user data:', user);
    alert('Profile saved successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);

  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-600">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-200 mb-2">👤 Profile </h2>
        <p className="text-gray-600">Testing input field functionality</p>
        <div className="mt-4">
          <p className="text-sm text-gray-100">
            Editing Mode: <span className="font-bold">{isEditing ? 'ON' : 'OFF'}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name * {isEditing && <span className="text-green-500">(Editable)</span>}
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email * {isEditing && <span className="text-green-500">(Editable)</span>}
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number * {isEditing && <span className="text-green-500">(Editable)</span>}
              </label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group {isEditing && <span className="text-green-500">(Editable)</span>}
              </label>
              <select
                name="bloodGroup"
                value={user.bloodGroup}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address {isEditing && <span className="text-green-500">(Editable)</span>}
            </label>
            <textarea
              name="address"
              value={user.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="3"
              placeholder="Enter your full address"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
              }`}
            />
          </div>
        </div>

  
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🏥 Medical Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical Conditions {isEditing && <span className="text-green-500">(Editable)</span>}
              </label>
              <textarea
                name="medicalConditions"
                value={user.medicalConditions}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="3"
                placeholder="List any chronic conditions, medications, or medical history"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Allergies {isEditing && <span className="text-green-500">(Editable)</span>}
              </label>
              <textarea
                name="allergies"
                value={user.allergies}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="2"
                placeholder="List any known allergies"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
              />
            </div>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🚨 Emergency Settings</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Message {isEditing && <span className="text-green-500">(Editable)</span>}
            </label>
            <textarea
              name="emergencyMessage"
              value={user.emergencyMessage}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="3"
              placeholder="Custom message to send during emergencies (optional)"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
              }`}
            />
          </div>
        </div>

    
        <div className="flex justify-center space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                ✅ Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                ❌ Cancel
              </button>
            </div>
          )}
        </div>
      </form>

     
      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <h4 className="font-bold text-yellow-800 mb-2">🐛 Debug Information</h4>
        <div className="text-sm text-yellow-700">
          <p><strong>Current user state:</strong></p>
          <pre className="mt-2 bg-yellow-100 p-2 rounded text-xs overflow-x-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProfileDebug;