import React, { useState, useEffect } from 'react';

const AlertPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, resolved

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const alertsData = await response.json();
        setAlerts(alertsData);
      } else {
        console.error('Failed to fetch alerts');
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const resolveAlert = async (alertId) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}/resolve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setAlerts(prev =>
          prev.map(alert =>
            alert._id === alertId
              ? { ...alert, status: 'resolved', resolvedAt: new Date().toISOString() }
              : alert
          )
        );
        alert('✅ Alert marked as resolved');
      } else {
        throw new Error('Failed to resolve alert');
      }
    } catch (error) {
      console.error('Error resolving alert:', error);
      alert('❌ Failed to resolve alert');
    }
  };

  const deleteAlert = async (alertId) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        const response = await fetch(`/api/alerts/${alertId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          setAlerts(prev => prev.filter(alert => alert._id !== alertId));
          alert('✅ Alert deleted successfully');
        } else {
          throw new Error('Failed to delete alert');
        }
      } catch (error) {
        console.error('Error deleting alert:', error);
        alert('❌ Failed to delete alert');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'SOS_BUTTON_PRESS':
        return '🆘';
      case 'HEALTH_EMERGENCY':
        return '🏥';
      case 'PANIC_BUTTON':
        return '🚨';
      case 'FALL_DETECTION':
        return '🤕';
      default:
        return '⚠️';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'active') return alert.status === 'active';
    if (filter === 'resolved') return alert.status === 'resolved';
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading alerts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🚨 Emergency Alerts</h2>
        <p className="text-gray-600">View and manage your emergency alert history</p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Alerts ({alerts.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            filter === 'active'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Active ({alerts.filter(a => a.status === 'active').length})
        </button>
        <button
          onClick={() => setFilter('resolved')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            filter === 'resolved'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Resolved ({alerts.filter(a => a.status === 'resolved').length})
        </button>
      </div>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🚨</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No alerts found</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? "You haven't triggered any emergency alerts yet" 
              : `No ${filter} alerts found`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((alertItem) => (
              <div key={alertItem._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-3xl">{getAlertIcon(alertItem.type)}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {alertItem.type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(alertItem.status)}`}>
                          {alertItem.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Time:</span> {' '}
                          {new Date(alertItem.timestamp).toLocaleString()}
                        </p>
                        
                        {alertItem.location && (
                          <p>
                            <span className="font-medium">Location:</span> {' '}
                            <a 
                              href={`https://maps.google.com?q=${alertItem.location.latitude},${alertItem.location.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              📍 {alertItem.location.latitude.toFixed(6)}, {alertItem.location.longitude.toFixed(6)}
                            </a>
                          </p>
                        )}
                        
                        {alertItem.message && (
                          <p>
                            <span className="font-medium">Message:</span> {alertItem.message}
                          </p>
                        )}
                        
                        {alertItem.contactsNotified && (
                          <p>
                            <span className="font-medium">Contacts Notified:</span> {alertItem.contactsNotified.length} contacts
                          </p>
                        )}
                        
                        {alertItem.resolvedAt && (
                          <p>
                            <span className="font-medium">Resolved:</span> {' '}
                            {new Date(alertItem.resolvedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    {alertItem.status === 'active' && (
                      <button
                        onClick={() => resolveAlert(alertItem._id)}
                        className="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-1 px-3 rounded-md text-sm transition-colors duration-200"
                      >
                        ✅ Resolve
                      </button>
                    )}
                    
                    <button
                      onClick={() => deleteAlert(alertItem._id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-3 rounded-md text-sm transition-colors duration-200"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Emergency Statistics */}
      {alerts.length > 0 && (
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">📊 Emergency Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{alerts.length}</div>
              <div className="text-blue-600">Total Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-700">
                {alerts.filter(a => a.status === 'active').length}
              </div>
              <div className="text-red-600">Active Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {alerts.filter(a => a.status === 'resolved').length}
              </div>
              <div className="text-green-600">Resolved Alerts</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertPage;