import React, { useState } from 'react';
import { Box, TextField, Stack, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Image, Videocam, AttachFile } from '@mui/icons-material';

import { ImageGallery, PetPicker } from 'components';
import { useAddPostMutation, useGetPetsQuery } from 'generated/graphql';

export function NewPost() {
  const { data, loading, error } = useGetPetsQuery();
  const [addPost, { loading: submitting }] = useAddPostMutation();
  const [selectedPetIdx, setSelectedPetIdx] = useState(0);
  const [text, setText] = useState('');
  const [images, setImages] = useState<File[]>([]);

  if (loading) {
    return null;
  }

  if (error || !data) {
    throw new Error('cannot get user pets');
  }

  const { pets } = data;

  const selectedPet = pets[selectedPetIdx];

  const handleSelectPet = (petId: string) => {
    const idx = pets.findIndex((p) => p.petId === petId);

    if (idx !== -1) {
      setSelectedPetIdx(idx);
    }
  };

  const handlePickedImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files;

    if (picked == null) {
      return;
    }

    const files = Array.from(picked);

    setImages([...images, ...files]);
  };

  const hasContent = () => {
    const hasImages = images.length > 0;
    const hasText = !!text.trim();

    return hasImages || hasText;
  };

  const post = async () => {
    await addPost({
      variables: {
        props: { petId: selectedPet.petId, text, pictures: images },
      },
    });
    setText('');
    setImages([]);
  };

  const imgSrcs = images.map((img) => URL.createObjectURL(img));

  return (
    <Box
      sx={{
        padding: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <PetPicker
        pets={pets}
        selectedPet={selectedPet}
        onSelect={handleSelectPet}
      />
      <TextField
        multiline={true}
        label="What's your pet up to?"
        fullWidth={true}
        minRows={2}
        maxRows={4}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      {images.length > 0 && <ImageGallery images={imgSrcs} />}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Stack
          direction="row"
          paddingTop={1}
          paddingRight={1}
          paddingBottom={1}
        >
          <label htmlFor="icon-button-file">
            <input
              style={{ display: 'none' }}
              accept="image/*"
              id="icon-button-file"
              type="file"
              multiple={true}
              onChange={handlePickedImages}
            />
            <IconButton aria-label="upload picture" component="span">
              <Image fontSize="small" />
            </IconButton>
          </label>
          <IconButton>
            <Videocam fontSize="small" />
          </IconButton>
          <IconButton>
            <AttachFile fontSize="small" />
          </IconButton>
        </Stack>
        <LoadingButton
          color="primary"
          variant="contained"
          disabled={!hasContent()}
          onClick={post}
          loading={submitting}
        >
          Post
        </LoadingButton>
      </Box>
    </Box>
  );
}
