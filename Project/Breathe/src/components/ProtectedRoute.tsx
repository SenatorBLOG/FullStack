// src/components/ProtectedRoute.tsx
import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  if (!isAuthenticated) {
    // перенаправим на страницу превью статистики или на логин
    return <Navigate to="/home-page" state={{ from: location }} replace />;
  }
  return children;
};
