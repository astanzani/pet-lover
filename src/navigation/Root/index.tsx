import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@types';
import { Feed } from '@screens';
import { SignInStack } from '../SignIn';
import { HomeStack } from '../Home';
import { Routes } from '@config';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  signedIn: boolean;
}

export function RootStack({ signedIn = false }: Props) {
  return (
    <Stack.Navigator
      initialRouteName={signedIn ? Routes.HOME_STACK : Routes.SIGN_IN_STACK}
      screenOptions={{ headerShown: false }}
    >
      {signedIn ? (
        <>
          <Stack.Screen
            name={Routes.HOME_STACK}
            component={HomeStack}
            options={{ headerTitle: 'Feed' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={Routes.SIGN_IN_STACK} component={SignInStack} />
        </>
      )}
    </Stack.Navigator>
  );
}
