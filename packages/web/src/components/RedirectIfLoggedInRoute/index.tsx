import React from 'react';
import { CircularProgress } from '@mui/material';

import { useAuthStatus } from 'hooks';
import { AuthStatus } from 'types';
import { Navigate } from 'react-router';
import { Routes } from 'config';

interface Props {
  children: React.ReactNode;
}

export function RedirectIfLoggedInRoute({ children }: Props) {
  const authStatus = useAuthStatus();

  return authStatus === AuthStatus.Loading ? (
    <CircularProgress />
  ) : authStatus === AuthStatus.SignedIn ? (
    <Navigate to={Routes.HOME} />
  ) : (
    <>{children}</>
  );
}
