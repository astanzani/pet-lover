import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStatus } from '@hooks';
import { AuthStatus } from '@types';
import { RootStack } from '@navigation';

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
