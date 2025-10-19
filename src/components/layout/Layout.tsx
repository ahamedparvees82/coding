import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
const Layout: React.FC = () => {
  const {
    isAuthenticated
  } = useAuth();
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <div className="flex flex-col h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-950">
          <Outlet />
        </main>
      </div>
    </div>;
};
export default Layout;