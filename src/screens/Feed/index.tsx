import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Auth } from '@aws-amplify/auth';

export function Feed() {
  const s = async () => {
    await Auth.signOut();
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Feed</Text>
      <Button onPress={s}>Sign Out</Button>
    </View>
  );
}
