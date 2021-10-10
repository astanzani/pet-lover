import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

import { Avatar, Button } from '@components';
import { Pet } from '@types';
import getStyles from './styles';
import { useUnfollowPetMutation } from '@graphql/mutations';
import { GET_FOLLOWEES, GET_PROFILE } from '@graphql/queries';

interface Props {
  pet: Pet;
}

export function UnfollowPetCard({ pet }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [unfollowPet] = useUnfollowPetMutation();

  const onUnfollowPress = async () => {
    await unfollowPet({
      variables: { petId: pet.petId, ownerId: pet.userId },
      refetchQueries: [GET_FOLLOWEES, GET_PROFILE],
    });
  };

  return (
    <View style={styles.unfollowPetCard}>
      <View style={styles.unfollowPetCardPetInfo}>
        <Avatar
          picture={pet.picture}
          fallbackIcon="paw"
          styles={styles.unfollowPetCardPetAvatar}
        />
        <Text>{pet.name}</Text>
      </View>
      <Button onPress={onUnfollowPress}>Unfollow</Button>
    </View>
  );
}
