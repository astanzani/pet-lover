import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Feed, More } from '@screens';
import { Routes } from '@config';
import { PetsStack } from '../Pets';
import { NewPostStack } from '../NewPost';
import { ProfileStack } from '../Profile';

const Tab = createMaterialBottomTabNavigator();

export function HomeStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Routes.FEED}
        component={Feed}
        options={{ tabBarIcon: 'home' }}
      />
      <Tab.Screen
        name={Routes.NEW_POST_STACK}
        component={NewPostStack}
        options={{ tabBarIcon: 'image-plus', title: 'New Post' }}
      />
      <Tab.Screen
        name={Routes.PROFILE_STACK}
        component={ProfileStack}
        options={{ tabBarIcon: 'account', title: 'Profile' }}
      />
      <Tab.Screen
        name={Routes.PETS_STACK}
        component={PetsStack}
        options={{ tabBarIcon: 'paw', title: 'My Pets' }}
      />
      <Tab.Screen
        name={Routes.MORE}
        component={More}
        options={{ tabBarIcon: 'menu' }}
      />
    </Tab.Navigator>
  );
}
