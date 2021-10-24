import { useState, useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';
import { Hub, HubCallback } from '@aws-amplify/core';

import { AuthStatus } from 'types';

export function useAuthStatus() {
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.Loading);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setStatus(AuthStatus.SignedIn);
      } catch (e) {
        setStatus(AuthStatus.SignedOut);
      }
    };

    const listenAuth: HubCallback = (data) => {
      switch (data.payload.event) {
        case 'signIn':
          setStatus(AuthStatus.SignedIn);
          break;
        case 'signOut':
          setStatus(AuthStatus.SignedOut);
          break;
      }
    };

    checkAuth();
    Hub.listen('auth', listenAuth);

    return () => Hub.remove('auth', listenAuth);
  }, []);

  return status;
}
