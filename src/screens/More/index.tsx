import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from '@aws-amplify/auth';

import { Button } from '@components';

export function More() {
  return (
    <SafeAreaView>
      <Button onPress={Auth.signOut}>Sign Out</Button>
    </SafeAreaView>
  );
}
