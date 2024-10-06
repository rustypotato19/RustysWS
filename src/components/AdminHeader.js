import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);  // Store notifications
  const [unreadCount, setUnreadCount] = useState(0);  // Count of unread notifications
  const [showDropdown, setShowDropdown] = useState(false); // Toggle notification dropdown

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
  
      try {
        const response = await axios.get('https://rustyws.com/api/admin/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
        
        // Count unread notifications
        const unreadNotifications = response.data.filter(notification => notification.read_status === 0);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
  
    fetchNotifications();
  
    const interval = setInterval(fetchNotifications, 10000);  // Poll every 10 seconds
  
    return () => clearInterval(interval);  // Clean up the interval on component unmount
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin-login');
  };

  const markNotificationsAsRead = async () => {
    try {
      const token = localStorage.getItem('token');  // Get token

      await axios.put('https://rustyws.com/api/admin/notifications/mark-read', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Reset unread count and mark notifications as read
      setUnreadCount(0);
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        read_status: 1,
      }));
      setNotifications(updatedNotifications);
    } catch (err) {
      console.error('Error marking notifications as read:', err);
    }
  };

  return (
    <header className="bg-rws-dark-blue text-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/images/logos/admin.png"
            alt="Admin Dashboard Logo"
            className="h-10 w-10 mr-3"
          />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="font-bold bg-green-900 hover:bg-green-800 px-4 py-2 rounded-lg"
          >
            Home
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowDropdown(!showDropdown); markNotificationsAsRead(); }}
              className="font-bold bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-lg relative"
            >
              Notifications
              {unreadCount > 0 && (
                <span className="absolute top-[-0.5rem] right-[-0.5rem] bg-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className={`p-2 ${notification.read_status === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                      {notification.message}
                    </div>
                  ))
                ) : (
                  <div className="p-2">No notifications</div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="font-bold bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
