import React, { useState } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import { Text, IconButton, Snackbar, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import { NavigationProp } from '@react-navigation/core';

import { useGetPetsQuery } from '@graphql/queries';
import { useAddPostMutation } from '@graphql/mutations';
import { Button, FilePickerDialog, ImageGallery } from '@components';
import { PetPicker } from './PetPicker';
import { PostsStackParamList } from '@types';
import getStyles from './styles';

interface Props {
  navigation: NavigationProp<PostsStackParamList>;
}

export function NewPost({ navigation }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { data, loading, error } = useGetPetsQuery();
  const [submitting, setSubmitting] = useState(false);
  const [selectedPetIdx, setSelectedPetIdx] = useState(0);
  const [content, setContent] = useState('');
  const [addPost] = useAddPostMutation();
  const [images, setImages] = useState<Array<string>>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const showSnackbar = () => setSnackbarVisible(true);
  const hideSnackbar = () => setSnackbarVisible(false);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !data) {
    console.log(JSON.stringify(error, null, 2));

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

  const handlePickedPet = (idx: number) => {
    setSelectedPetIdx(idx);
  };

  const handlePickedImage = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.cancelled) {
      setImages([...images, result.uri]);
      closeDialog();
    }
  };

  const handleDeletedImage = (idx: number) => {
    setImages(images.filter((_, i) => idx !== i));
  };

  const hasContent = () => {
    const hasImages = images.length > 0;
    const hasText = !!content;

    return hasImages || hasText;
  };

  const resetState = () => {
    setContent('');
    setImages([]);
  };

  const submitPost = async () => {
    setSubmitting(true);

    const files = images.map(
      (image) =>
        new ReactNativeFile({ uri: image, name: 'image', type: 'image/jpeg' })
    );

    try {
      await addPost({
        variables: {
          props: { text: content, petId: selectedPet.petId, pictures: files },
        },
      });
      showSnackbar();
      resetState();
      setTimeout(() => navigation.goBack(), 1000);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <PetPicker
            selectedPet={selectedPet}
            pets={pets}
            onSelectPet={handlePickedPet}
          />
          <TextInput
            placeholder="Type here..."
            multiline={true}
            value={content}
            onChangeText={setContent}
            style={styles.input}
          />
          <ImageGallery images={images} onDelete={handleDeletedImage} />
        </View>
        <View>
          <View style={styles.toolbar}>
            <IconButton
              icon="image"
              color={theme.colors.primary}
              onPress={openDialog}
              size={32}
              style={styles.toolbarIcon}
            />
            <IconButton
              icon="video"
              color={theme.colors.primary}
              onPress={openDialog}
              size={32}
              style={styles.toolbarIcon}
            />
            <IconButton
              icon="attachment"
              color={theme.colors.primary}
              onPress={openDialog}
              size={32}
              style={styles.toolbarIcon}
            />
          </View>
          <Button
            mode="contained"
            onPress={submitPost}
            loading={submitting}
            disabled={!hasContent()}
          >
            Post
          </Button>
        </View>
      </ScrollView>
      <FilePickerDialog
        title="Add a photo to your post"
        open={dialogOpen}
        onPickImage={handlePickedImage}
        onDismiss={closeDialog}
      />
      <Snackbar visible={snackbarVisible} onDismiss={hideSnackbar}>
        Post submitted!
      </Snackbar>
    </View>
  );
}
