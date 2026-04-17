import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';
import ManageResources from './pages/ManageResources';
import ManageBookings from './pages/ManageBookings';
import Unauthorized from './pages/Unauthorized';
import OAuth2Callback from './pages/OAuth2Callback';
import DashboardRedirect from './components/DashboardRedirect';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth2/callback" element={<OAuth2Callback />} />
          
          {/* Dashboard Entry Point (Redirector) */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Role-Specific Protected Dashboards */}
          <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
            <Route path="/dashboard/user" element={<UserDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/resources" element={<ManageResources />} />
            <Route path="/dashboard/admin/bookings" element={<ManageBookings />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['TECHNICIAN']} />}>
            <Route path="/dashboard/technician" element={<TechnicianDashboard />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Default Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
