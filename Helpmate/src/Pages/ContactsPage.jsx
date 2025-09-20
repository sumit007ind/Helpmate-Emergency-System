import React, { useState, useEffect } from 'react';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    priority: 1,
    isActive: true
  });

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const contactsData = await response.json();
        setContacts(contactsData);
      } else {
        console.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewContact(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newContact)
      });

      if (response.ok) {
        const addedContact = await response.json();
        setContacts(prev => [...prev, addedContact]);
        setNewContact({
          name: '',
          phone: '',
          email: '',
          relationship: '',
          priority: 1,
          isActive: true
        });
        setIsAddingContact(false);
        alert('✅ Contact added successfully!');
      } else {
        throw new Error('Failed to add contact');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('❌ Failed to add contact. Please try again.');
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact._id);
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      relationship: contact.relationship,
      priority: contact.priority,
      isActive: contact.isActive
    });
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/contacts/${editingContact}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newContact)
      });

      if (response.ok) {
        const updatedContact = await response.json();
        setContacts(prev => 
          prev.map(contact => 
            contact._id === editingContact ? updatedContact : contact
          )
        );
        setEditingContact(null);
        setNewContact({
          name: '',
          phone: '',
          email: '',
          relationship: '',
          priority: 1,
          isActive: true
        });
        alert('✅ Contact updated successfully!');
      } else {
        throw new Error('Failed to update contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('❌ Failed to update contact. Please try again.');
    }
  };

  const handleDeleteContact = async (contactId, contactName) => {
    if (window.confirm(`Are you sure you want to delete ${contactName}?`)) {
      try {
        const response = await fetch(`/api/contacts/${contactId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          setContacts(prev => prev.filter(contact => contact._id !== contactId));
          alert('✅ Contact deleted successfully!');
        } else {
          throw new Error('Failed to delete contact');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('❌ Failed to delete contact. Please try again.');
      }
    }
  };

  const handleToggleActive = async (contactId, isActive) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ isActive: !isActive })
      });

      if (response.ok) {
        setContacts(prev =>
          prev.map(contact =>
            contact._id === contactId
              ? { ...contact, isActive: !isActive }
              : contact
          )
        );
      } else {
        throw new Error('Failed to toggle contact status');
      }
    } catch (error) {
      console.error('Error toggling contact status:', error);
    }
  };

  const handleCancel = () => {
    setIsAddingContact(false);
    setEditingContact(null);
    setNewContact({
      name: '',
      phone: '',
      email: '',
      relationship: '',
      priority: 1,
      isActive: true
    });
  };

  const testContact = async (contact) => {
    try {
      const response = await fetch('/api/contacts/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ contactId: contact._id })
      });

      if (response.ok) {
        alert(`📱 Test message sent to ${contact.name}!`);
      } else {
        throw new Error('Failed to send test message');
      }
    } catch (error) {
      console.error('Error sending test message:', error);
      alert('❌ Failed to send test message.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">📞 Emergency Contacts</h2>
          <p className="text-gray-600">Manage your emergency contacts who will be notified during SOS</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
          onClick={() => setIsAddingContact(true)}
          disabled={isAddingContact || editingContact}
        >
          ➕ Add New Contact
        </button>
      </div>

      {/* Add/Edit Contact Form */}
      {(isAddingContact || editingContact) && (
        <form
          onSubmit={editingContact ? handleUpdateContact : handleAddContact}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {editingContact ? '✏️ Edit Contact' : '➕ Add New Contact'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={newContact.name}
                onChange={handleInputChange}
                required
                placeholder="Enter contact name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={newContact.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={newContact.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
              <select
                name="relationship"
                value={newContact.relationship}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Relationship</option>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Colleague">Colleague</option>
                <option value="Neighbor">Neighbor</option>
                <option value="Doctor">Doctor</option>
                <option value="Emergency Services">Emergency Services</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
              <select
                name="priority"
                value={newContact.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1 - Highest Priority</option>
                <option value={2}>2 - High Priority</option>
                <option value={3}>3 - Medium Priority</option>
                <option value={4}>4 - Low Priority</option>
              </select>
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={newContact.isActive}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Active Contact</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              {editingContact ? '✅ Update Contact' : '➕ Add Contact'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Contacts List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Emergency Contacts ({contacts.length})</h3>
        </div>
        
        {contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-6xl mb-4">📞</div>
            <p className="text-lg mb-2">No emergency contacts yet</p>
            <p className="text-sm">Add your first emergency contact to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {contacts
              .sort((a, b) => a.priority - b.priority)
              .map((contact) => (
                <div key={contact._id} className={`p-6 ${!contact.isActive ? 'bg-gray-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${contact.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <h4 className="text-lg font-semibold text-gray-800">{contact.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          contact.priority === 1 ? 'bg-red-100 text-red-800' :
                          contact.priority === 2 ? 'bg-orange-100 text-orange-800' :
                          contact.priority === 3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          Priority {contact.priority}
                        </span>
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Phone:</span> {contact.phone}
                        </p>
                        {contact.email && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Email:</span> {contact.email}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Relationship:</span> {contact.relationship}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => testContact(contact)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-1 px-3 rounded-md text-sm transition-colors duration-200"
                        title="Send test message"
                      >
                        📱 Test
                      </button>
                      
                      <button
                        onClick={() => handleToggleActive(contact._id, contact.isActive)}
                        className={`font-medium py-1 px-3 rounded-md text-sm transition-colors duration-200 ${
                          contact.isActive 
                            ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' 
                            : 'bg-green-100 hover:bg-green-200 text-green-700'
                        }`}
                        title={contact.isActive ? 'Deactivate contact' : 'Activate contact'}
                      >
                        {contact.isActive ? '⏸️ Pause' : '▶️ Active'}
                      </button>
                      
                      <button
                        onClick={() => handleEditContact(contact)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 rounded-md text-sm transition-colors duration-200"
                        disabled={editingContact === contact._id}
                      >
                        ✏️ Edit
                      </button>
                      
                      <button
                        onClick={() => handleDeleteContact(contact._id, contact.name)}
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
      </div>

      {/* Emergency Contact Guidelines */}
      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">📋 Emergency Contact Guidelines</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">▶</span>
            Add at least 3-5 emergency contacts for better coverage
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">▶</span>
            Set priority levels: 1 (immediate family), 2 (close friends), 3 (colleagues), 4 (others)
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">▶</span>
            Include different types: family, friends, medical contacts, local emergency services
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">▶</span>
            Test your contacts regularly to ensure they receive notifications
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">▶</span>
            Keep contact information updated and inform contacts about their emergency role
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactsPage;