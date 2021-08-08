import React from 'react';
import { Text } from 'react-native';
import { Auth } from '@aws-amplify/auth';
import { REACT_APP_USER_POOL_ID, REACT_APP_USER_POOL_CLIENT_ID } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStatus } from '@hooks';
import { AuthStatus } from '@types';
import { RootStack } from '@navigation';

Auth.configure({
  userPoolId: REACT_APP_USER_POOL_ID,
  userPoolWebClientId: REACT_APP_USER_POOL_CLIENT_ID,
});

export function Main() {
  const authStatus = useAuthStatus();

  if (authStatus === AuthStatus.Loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return <RootStack signedIn={authStatus === AuthStatus.SignedIn} />;
}
