import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bloodGroup: '',
    medicalConditions: '',
    allergies: '',
    emergencyMessage: '',
    profileImage: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        alert('✅ Profile updated successfully!');
        setIsEditing(false);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('❌ Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchUserProfile(); // Reset to original data
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">👤 My Profile</h2>
        <p className="text-gray-600">Manage your personal information and emergency settings</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Image Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">
                  📷
                </div>
              )}
            </div>
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select
                name="bloodGroup"
                value={user.bloodGroup}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={user.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="3"
              placeholder="Enter your full address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🏥 Medical Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
              <textarea
                name="medicalConditions"
                value={user.medicalConditions}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="3"
                placeholder="List any chronic conditions, medications, or medical history"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
              <textarea
                name="allergies"
                value={user.allergies}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="2"
                placeholder="List any known allergies"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Emergency Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🚨 Emergency Settings</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Message</label>
            <textarea
              name="emergencyMessage"
              value={user.emergencyMessage}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="3"
              placeholder="Custom message to send during emergencies (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                {saving ? '💾 Saving...' : '✅ Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                ❌ Cancel
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Emergency Info Card */}
      <div className="mt-8 bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-4">🚨 Emergency Quick Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <strong className="text-red-700">Name:</strong> 
            <span className="text-gray-700">{user.name || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-red-700">Phone:</strong> 
            <span className="text-gray-700">{user.phone || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-red-700">Blood Group:</strong> 
            <span className="text-gray-700">{user.bloodGroup || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-red-700">Medical Conditions:</strong> 
            <span className="text-gray-700">{user.medicalConditions || 'None specified'}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <strong className="text-red-700">Allergies:</strong> 
          <span className="text-gray-700">{user.allergies || 'None specified'}</span>
        </div>
        <p className="text-red-600 text-sm mt-4">
          💡 This information will be shared with emergency contacts when SOS is activated
        </p>
      </div>
    </div>
  );
};

export default Profile;