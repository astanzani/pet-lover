import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Avatar, Props as AvatarProps } from '../Avatar';
import getStyles from './styles';

interface Props {
  avatars: AvatarProps[];
}

export function AvatarGroup({ avatars }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.root}>
      {avatars.map((avatar) => (
        <Avatar
          key={avatar.picture}
          {...avatar}
          styles={styles.avatar}
          size={65}
        />
      ))}
    </View>
  );
}
