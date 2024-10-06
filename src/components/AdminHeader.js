// AdminLayout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear localStorage where token is stored
        localStorage.removeItem('token'); // Remove the actual token key
    
        // Redirect to login page
        navigate('/admin-login');
    };

  return (
    <header className="bg-rws-dark-blue text-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo or Title */}
        <div className="flex items-center">
          <img
            src="/images/logos/admin.png" // You can replace this with your logo's path
            alt="Admin Dashboard Logo"
            className="h-10 w-10 mr-3"
          />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        {/* User Profile & Settings */}
        <div className="flex items-center space-x-4">
        <button 
            onClick={() => navigate('/')}
            className="font-bold bg-green-900 hover:bg-green-800 px-4 py-2 rounded-lg"
            >
            Home
          </button>
          <button className="font-bold bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-lg">
            Notifications
          </button>
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
