import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRoutesProps {
  children: JSX.Element;
}

const PrivateRoutes = ({ children }: PrivateRoutesProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    // Redirect to login page, preserving the location state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoutes;
