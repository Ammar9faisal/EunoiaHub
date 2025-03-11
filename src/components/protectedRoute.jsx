import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!user) { // If user is not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;