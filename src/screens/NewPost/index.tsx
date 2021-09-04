import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Text,
  Title,
  IconButton,
  TextInput,
  TouchableRipple,
  List,
  useTheme,
} from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { GET_PETS } from '@graphql/queries';
import { Pet } from '@types';
import getStyles from './styles';

export function NewPost() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = ['50%'];
  const { data, loading, error } = useQuery<{ pets: Pet[] }>(GET_PETS);
  const [selectedPetIdx, setSelectedPetIdx] = useState(0);

  const openPetPicker = () => {
    bottomSheetRef.current?.present();
  };

  const selectPet = (index: number) => {
    setSelectedPetIdx(index);
    bottomSheetRef.current?.close();
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View>
        <Text>{`Error: ${error}`}</Text>
      </View>
    );
  }

  const { pets } = data;

  if (pets.length === 0) {
    return (
      <View>
        <Text>You need to add a pet first to be able to post!</Text>
      </View>
    );
  }

  const selectedPet = pets[selectedPetIdx];

  return (
    <View style={styles.root}>
      <TouchableRipple style={styles.petPicker} onPress={openPetPicker}>
        <>
          {selectedPet.picture ? (
            <Avatar.Image
              style={styles.petPickerAvatar}
              size={50}
              source={{ uri: selectedPet.picture }}
            />
          ) : (
            <Avatar.Icon style={styles.petPickerAvatar} size={50} icon="paw" />
          )}
          <Title>{selectedPet.name}</Title>
          <IconButton icon="chevron-down" />
        </>
      </TouchableRipple>
      <View>
        <TextInput
          mode="outlined"
          placeholder="Type here..."
          multiline={true}
          numberOfLines={15}
        />
      </View>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <View style={styles.petPickerModalContent}>
          {pets.map((pet, index) => (
            <List.Item
              key={pet.petId}
              title={pet.name}
              onPress={selectPet.bind(null, index)}
              style={
                selectedPetIdx === index
                  ? styles.petPickerModalItemSelected
                  : undefined
              }
              left={() =>
                pet.picture ? (
                  <Avatar.Image size={48} source={{ uri: pet.picture }} />
                ) : (
                  <Avatar.Icon size={48} icon="paw" />
                )
              }
              right={() =>
                selectedPetIdx === index ? (
                  <IconButton icon="check" color={theme.colors.primary} />
                ) : null
              }
            />
          ))}
        </View>
      </BottomSheetModal>
    </View>
  );
}
