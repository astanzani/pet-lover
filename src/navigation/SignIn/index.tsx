import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn, SignUp } from '@screens';
import { SignInStackParamList } from '@types';
import { Routes } from '@config';

const Stack = createNativeStackNavigator<SignInStackParamList>();

export function SignInStack() {
  return (
    <Stack.Navigator screenOptions={{ contentStyle: { paddingTop: 0 } }}>
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
    </Stack.Navigator>
  );
}
