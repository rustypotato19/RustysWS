// AdminLayout.js
import React from 'react';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-container">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
