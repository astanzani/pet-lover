import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn, SignUp } from '../../screens';

const Stack = createNativeStackNavigator();

export function SignInStack() {
  return (
    <Stack.Navigator screenOptions={{ contentStyle: { paddingTop: 0 } }}>
      <Stack.Screen
        name="signin"
        component={SignIn}
        options={{ headerTitle: 'Sign In' }}
      />
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{ headerTitle: 'Sign Up' }}
      />
    </Stack.Navigator>
  );
}
