import React from 'react';
import { useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NewPost } from '@screens';
import { Routes } from '@config';
import { PostsStackParamList } from '@types';

const Stack = createNativeStackNavigator<PostsStackParamList>();

export function NewPostStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
      }}
    >
      <Stack.Screen
        name={Routes.NEW_POST}
        component={NewPost}
        options={{ title: 'Create new post' }}
      />
    </Stack.Navigator>
  );
}
