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
import { useMutation } from '@apollo/client';
import { ReactNativeFile } from 'apollo-upload-client';
import { NavigationProp } from '@react-navigation/native';

import { Button } from '@components';
import { UPLOAD_PET_PICTURE, SAVE_PET } from '@graphql/mutations';
import { GET_PETS } from '@graphql/queries';
import { PetsStackParamList } from '@types';
import getStyles from './styles';

interface Props {
  navigation: NavigationProp<PetsStackParamList>;
}

export function NewPet({ navigation }: Props) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [savePet] = useMutation(SAVE_PET);
  const [uploadPicture] =
    useMutation<{ addPicture: string; file: Blob }>(UPLOAD_PET_PICTURE);
  const theme = useTheme();
  const styles = getStyles(theme);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const handlePickedImage = (result: ImagePicker.ImagePickerResult) => {
    if (result.cancelled) {
      return;
    }

    setImageUri(result.uri);
    hideDialog();
  };

  const selectPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    handlePickedImage(result);
  };

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    handlePickedImage(result);
  };

  const submit = async () => {
    setLoading(true);

    try {
      const res = await savePet({
        variables: { props: { name } },
        refetchQueries: imageUri ? [] : [GET_PETS],
      });
      const id = res.data.addPet.petId;

      if (imageUri) {
        await uploadPicture({
          variables: {
            petId: id,
            picture: new ReactNativeFile({
              uri: imageUri,
              name: '',
              type: 'image/jpeg',
            }),
          },
          refetchQueries: [GET_PETS],
        });
      }

      setLoading(false);
      navigation.goBack();
    } catch (e) {
      console.error(e);
      setLoading(false);
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
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Button
        mode="contained"
        onPress={submit}
        disabled={!name}
        loading={loading}
      >
        Add
      </Button>
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
