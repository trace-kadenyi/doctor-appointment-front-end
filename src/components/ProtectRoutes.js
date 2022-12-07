import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoutes = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // if the user is  not logged in redirect to authentication.
  return currentUser ? <Outlet /> : <Navigate to="/authentication" />;
};

export default ProtectRoutes;
