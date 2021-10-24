import React from 'react';
import { Autocomplete, Avatar, Box, TextField } from '@mui/material';
import { Pets } from '@mui/icons-material';
import { Pet } from 'generated/graphql';

interface Props {
  pets: Pet[];
  selectedPet: Pet;
  onSelect: (id: string) => void;
}

export function PetPicker({ pets, selectedPet, onSelect }: Props) {
  return (
    <Autocomplete
      clearIcon={null}
      sx={{ width: 250 }}
      autoHighlight={true}
      options={pets}
      getOptionLabel={(option) => option.name}
      value={selectedPet}
      isOptionEqualToValue={(option, value) => option.petId === value.petId}
      inputValue={selectedPet.name}
      onChange={(_event, newValue) => onSelect(newValue!.petId)}
      renderOption={(props, option) => (
        <Box
          {...props}
          key={option.petId}
          component="li"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Avatar
            sx={{ width: 28, height: 28, marginRight: 2 }}
            src={option.picture ?? undefined}
          >
            <Pets fontSize="small" color="secondary" />
          </Avatar>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Posting as:"
          margin="dense"
          size="small"
        />
      )}
    />
  );
}
