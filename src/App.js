import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AdminLayout from "./components/AdminLayout";
import HomePage from "./HomePage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import RequestsPage from "./components/RequestsPage";
import ViewTicketPage from "./components/ViewTicketPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/requests"
          element={
            <MainLayout>
              <RequestsPage />
            </MainLayout>
          }
        />

        <Route 
          path="/view-ticket" 
          element={
            <MainLayout>
              <ViewTicketPage />
            </MainLayout>
          } 
        />

        {/* Admin Routes */}
        <Route
          path="/admin-login"
          element={
            <AdminLayout>
              <AdminLogin />
            </AdminLayout>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        
      </Routes>
    </Router>
  );
}

export default App;
