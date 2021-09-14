import React, { useRef } from 'react';
import { View } from 'react-native';
import {
  Avatar,
  IconButton,
  List,
  Title,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

import { Pet } from '@types';
import getStyles from './styles';

interface Props {
  pets: Pet[];
  selectedPet: Pet;
  onSelectPet: (idx: number) => void;
}

export function PetPicker({ pets, selectedPet, onSelectPet }: Props) {
  const snapPoints = ['50%'];
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();
  const styles = getStyles(theme);

  const openPicker = () => {
    bottomSheetRef.current?.present();
  };

  const selectPet = (index: number) => {
    onSelectPet(index);
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <TouchableRipple style={styles.petPicker} onPress={openPicker}>
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
                selectedPet.petId === pet.petId
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
                selectedPet.petId === pet.petId ? (
                  <IconButton icon="check" color={theme.colors.primary} />
                ) : null
              }
            />
          ))}
        </View>
      </BottomSheetModal>
    </>
  );
}
