import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from '@aws-amplify/auth';

import { Button } from '@components';

export function More() {
  const signOut = async () => {
    await Auth.signOut();
  };

  return (
    <SafeAreaView>
      <Button onPress={signOut}>Sign Out</Button>
    </SafeAreaView>
  );
}
