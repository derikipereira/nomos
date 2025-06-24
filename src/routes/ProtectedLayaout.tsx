import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import DashboardContainer from '../pages/dashboard/DashboardContainer';

const ProtectedLayout: React.FC = () => {
  const authToken = Cookies.get('auth_token');

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardContainer>
      <Outlet />
    </DashboardContainer>
  );
};

export default ProtectedLayout;