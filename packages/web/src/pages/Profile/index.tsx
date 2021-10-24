import React from 'react';
import { Box } from '@mui/material';

import { LeftNav } from 'components';
import { Routes } from 'config';

export function Profile() {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: 1,
        maxWidth: 1300,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <LeftNav activeItem={Routes.PROFILE} />
      <Box sx={{ flex: 2 }}>Profile</Box>
      <Box>Sidebar</Box>
    </Box>
  );
}
