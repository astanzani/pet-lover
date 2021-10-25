import React, { useState } from 'react';
import { View } from 'react-native';
import { Title, useTheme } from 'react-native-paper';

import {
  Pet,
  GetFolloweesDocument,
  GetProfileDocument,
  useFollowPetMutation,
} from '@generated/graphql';
import { Avatar, Button } from '../../components';
import getStyles from './styles';

interface Props {
  pet: Pet;
}

export function FollowPetCard({ pet }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [following, setFollowing] = useState(false);
  const [followPet] = useFollowPetMutation();

  const handleFollowPress = async () => {
    const { errors } = await followPet({
      variables: { petId: pet.petId, ownerId: pet.userId },
      refetchQueries: [GetFolloweesDocument, GetProfileDocument],
    });
    if (!errors) {
      setFollowing(true);
    }
  };

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
      <Button
        mode="contained"
        compact
        onPress={handleFollowPress}
        disabled={following}
      >
        {following ? 'Following' : 'Follow'}
      </Button>
    </View>
  );
}
