import { Button } from '@components';
import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { IconButton, useTheme, Dialog, Portal } from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';

import getStyles from './styles';

interface Props {
  images: string[];
  onDelete: (idx: number) => void;
}

export function ImageGallery({ images, onDelete }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  if (images.length === 0) {
    return null;
  }

  const currentSrc = images[currentImageIdx];

  const hasPrevious = currentImageIdx > 0;
  const hasNext = currentImageIdx < images.length - 1;

  const handleNext = () => {
    if (hasNext) {
      setCurrentImageIdx(currentImageIdx + 1);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      setCurrentImageIdx(currentImageIdx - 1);
    }
  };

  const selectIndex = (idx: number) => {
    setCurrentImageIdx(idx);
  };

  const handleDelete = () => {
    onDelete(currentImageIdx);
    hideDialog();
  };

  return (
    <GestureRecognizer onSwipeLeft={handleNext} onSwipeRight={handlePrevious}>
      <View style={styles.root}>
        <Pressable style={styles.imageWrapper} onLongPress={showDialog}>
          <Image source={{ uri: currentSrc }} style={styles.image} />
        </Pressable>
        <View style={styles.dots}>
          {images.map((src, idx) => (
            <IconButton
              key={src}
              icon={idx === currentImageIdx ? 'circle' : 'circle-outline'}
              color={theme.colors.accent}
              onPress={selectIndex.bind(null, idx)}
              size={16}
            />
          ))}
        </View>
      </View>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Image Options</Dialog.Title>
          <Dialog.Content style={styles.optionsDialog}>
            <Button
              icon="delete"
              color={theme.colors.error}
              onPress={handleDelete}
            >
              Delete
            </Button>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </GestureRecognizer>
  );
}
