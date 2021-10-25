import React from 'react';
import { useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Profile, Following } from '@screens';
import { Routes } from '@config';
import { ProfileStackParamList } from '@types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
      }}
    >
      <Stack.Screen
        name={Routes.PROFILE}
        component={Profile}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen name={Routes.FOLLOWING} component={Following} />
      {/* <Stack.Screen
        name={Routes.NEW_PET}
        component={NewPet}
        options={{ title: 'Add a new pet' }}
      /> */}
    </Stack.Navigator>
  );
}
