import React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { Button } from '../Button';
import getStyles from './styles';

interface Props {
  title: string;
  open: boolean;
  onPickImage: (image: ImagePicker.ImagePickerResult) => void;
  onDismiss: () => void;
}

export function FilePickerDialog({
  title,
  open,
  onPickImage,
  onDismiss,
}: Props) {
  const styles = getStyles();

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    onPickImage(result);
  };

  const selectPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    onPickImage(result);
  };

  return (
    <Portal>
      <Dialog visible={open} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Button icon="camera" onPress={takePicture}>
            Take a picture
          </Button>
          <Button icon="image-multiple" onPress={selectPicture}>
            Pick from gallery
          </Button>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
