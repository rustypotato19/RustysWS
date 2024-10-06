import React, { useState } from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom'; 

const AdminLogin = () => {
  const [username, setUsername] = useState(''); // Add username state
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a POST request to the login API with username and password
      const response = await axios.post(
        'https://rustyws.com/api/admin/login',
        { username, password },  // Send both username and password
        { withCredentials: true }
      );

      // If login is successful, store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);
  
      // Redirect to the admin dashboard
      navigate('/admin-dashboard');
    } catch (err) {
      // Handle error if login fails
      setError('Incorrect username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
      <input
        type="text"  // New input for username
        placeholder="Enter admin username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-full mb-4"
      />
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-full mb-4"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
