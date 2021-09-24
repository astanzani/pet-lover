import React from 'react';
import { View } from 'react-native';
import { Title, useTheme } from 'react-native-paper';

import { Pet } from '@types';
import { Avatar, Button } from '@components';
import getStyles from './styles';

interface Props {
  pet: Pet;
}

export function FollowPetCard({ pet }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.petListItem}>
      <View style={styles.petInfo}>
        <Avatar
          picture={pet.picture}
          fallbackIcon="paw"
          styles={styles.petAvatar}
        />
        <Title>{pet.name}</Title>
      </View>
      <Button mode="contained" compact>
        Follow
      </Button>
    </View>
  );
}
