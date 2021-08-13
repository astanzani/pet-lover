import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import {
  useTheme,
  Avatar,
  FAB,
  TextInput,
  Dialog,
  Portal,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { Button } from '@components';
import getStyles from './styles';

export function NewPet() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const theme = useTheme();
  const styles = getStyles(theme);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const selectPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setImageUri(result.uri);
      hideDialog();
    }
  };

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.cancelled) {
      setImageUri(result.uri);
      hideDialog();
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.avatarWrapper}>
        <Pressable onPress={showDialog}>
          {imageUri ? (
            <Avatar.Image size={100} source={{ uri: imageUri }} />
          ) : (
            <Avatar.Icon size={100} icon="paw" />
          )}
          <FAB small style={styles.plusButton} icon="plus" />
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Name"
        placeholder="Simba"
      />
      <Button mode="contained">Add</Button>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Add a profile picture</Dialog.Title>
          <Dialog.Content style={styles.picDialogContent}>
            <Button icon="camera" onPress={takePicture}>
              Take a picture
            </Button>
            <Button icon="image-multiple" onPress={selectPicture}>
              Pick from gallery
            </Button>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
