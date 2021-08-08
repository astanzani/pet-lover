import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Auth } from '@aws-amplify/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Feed() {
  const s = async () => {
    await Auth.signOut();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Feed</Text>
      <Button onPress={s}>Sign Out</Button>
    </SafeAreaView>
  );
}
