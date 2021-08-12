import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

import { SignIn, SignUp, ConfirmSignUp } from '@screens';
import { SignInStackParamList } from '@types';
import { Routes } from '@config';

const Stack = createNativeStackNavigator<SignInStackParamList>();

export function SignInStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
      }}
    >
      <Stack.Screen
        name={Routes.SIGN_IN}
        component={SignIn}
        options={{ headerTitle: 'Sign In' }}
      />
      <Stack.Screen
        name={Routes.SIGN_UP}
        component={SignUp}
        options={{ headerTitle: 'Sign Up' }}
      />
      <Stack.Screen
        name={Routes.CONFIRM_SIGN_UP}
        component={ConfirmSignUp}
        options={{
          headerTitle: 'Verify your account',
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
