import React from 'react';
import { View } from 'react-native';
import {
  useTheme,
  IconButton,
  Title,
  ActivityIndicator,
  TouchableRipple,
} from 'react-native-paper';
import { NavigationProp } from '@react-navigation/core';

import { useGetProfileQuery } from '@graphql/queries';
import { Avatar } from '@components';
import getStyles from './styles';
import { ProfileStackParamList } from '@types';
import { Routes } from '@config';

interface Props {
  navigation: NavigationProp<ProfileStackParamList>;
}

export function Profile({ navigation }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { data, loading, error } = useGetProfileQuery({
    // fetchPolicy: 'cache-and-network',
  });

  const goToFollowing = () => {
    navigation.navigate(Routes.FOLLOWING);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !data) {
    console.error(error);
    throw new Error('Could not fetch user info!');
  }

  const { me, followees } = data;

  return (
    <View style={styles.root}>
      <View style={styles.userMainInfo}>
        <Avatar fallbackName={me.name} size={100} />
        <Title>{me.name}</Title>
      </View>
      <View>
        <Title>Following</Title>
        <TouchableRipple
          style={styles.followingSection}
          onPress={goToFollowing}
        >
          <>
            <View style={styles.followingAvatars}>
              {followees.items.slice(0, 3).map((followee) => (
                <Avatar
                  key={followee.petId}
                  picture={followee.picture}
                  fallbackIcon="paw"
                  styles={styles.avatar}
                />
              ))}
              <Avatar
                fallbackName={`+${followees.totalFound - 3}`}
                styles={{ backgroundColor: theme.colors.accent }}
              />
            </View>
            <IconButton icon="chevron-right" size={35} />
          </>
        </TouchableRipple>
      </View>
    </View>
  );
}
