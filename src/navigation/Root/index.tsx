import React from 'react';
import { useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@types';
import { FindPetsToFollow } from '@screens';
import { SignInStack } from '../SignIn';
import { HomeStack } from '../Home';
import { Routes } from '@config';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  signedIn: boolean;
}

export function RootStack({ signedIn = false }: Props) {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={signedIn ? Routes.HOME_STACK : Routes.SIGN_IN_STACK}
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
      }}
    >
      {signedIn ? (
        <>
          <Stack.Screen
            name={Routes.HOME_STACK}
            component={HomeStack}
            options={{ headerTitle: 'Feed' }}
          />
          <Stack.Screen
            name={Routes.FIND_PETS_TO_FOLLOW}
            component={FindPetsToFollow}
            options={{ headerTitle: 'Find Pets to Follow', headerShown: true }}
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
