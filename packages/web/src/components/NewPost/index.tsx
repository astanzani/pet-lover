import React, { useState } from 'react';
import { Avatar, Box, CircularProgress, Typography } from '@mui/material';
// import { useMeQuery } from 'generated/graphql';
import { PetPicker } from 'components';
import { useGetPetsQuery } from 'generated/graphql';

export function NewPost() {
  const { data, loading, error } = useGetPetsQuery();
  const [selectedPetIdx, setSelectedPetIdx] = useState(0);

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }

  const { pets } = data;

  const selectedPet = pets[selectedPetIdx];

  const handleSelectPet = (petId: string) => {
    const idx = pets.findIndex((p) => p.petId === petId);

    if (idx !== -1) {
      setSelectedPetIdx(idx);
    }
  };

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
    </Box>
  );
}
