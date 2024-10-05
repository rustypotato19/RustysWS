import React, { useState } from 'react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === 'ws0k4n0p8i1s9') {
      localStorage.setItem('admin', 'logged_in');
      window.location.href = '/admin-dashboard';  // Redirect to admin dashboard
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
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
