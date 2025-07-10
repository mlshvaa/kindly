import React from 'react';
import { Navigate, Outlet } from 'react-router';

type Props = {
  isAllowed: boolean;
  redirectTo?: string;
  children?: React.JSX.Element;
  allowedRoles?: string[];
  userRole?: string;
};

export default function ProtectedRoute({
  isAllowed,
  redirectTo = '/',
  children,
  allowedRoles,
  userRole,
}: Props): React.JSX.Element {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ?? <Outlet />;
}
