import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@types';
import { Feed } from '@screens';
import { SignInStack } from '@navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  signedIn: boolean;
}

export function RootStack({ signedIn = false }: Props) {
  return (
    <Stack.Navigator
      initialRouteName={signedIn ? 'Feed' : 'SignInStack'}
      screenOptions={{ headerShown: false }}
    >
      {signedIn ? (
        <>
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={{ headerTitle: 'Feed' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="SignInStack" component={SignInStack} />
        </>
      )}
    </Stack.Navigator>
  );
}
