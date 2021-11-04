import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

import { LeftNav, NewPost, SideBar } from 'components';
import { Routes } from 'config';
import { Feed } from './Feed';

export function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: 1,
        height: '100%',
        maxWidth: 1300,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <LeftNav activeItem={Routes.HOME} />
      <Divider orientation="vertical" flexItem={true} />
      <Box sx={{ flex: 2 }}>
        <Typography variant="body1" component="h1" sx={{ padding: 1 }}>
          Your Feed
        </Typography>
        <Divider />
        <NewPost />
        <Divider />
        <Feed />
      </Box>
      <Box sx={{ flex: 1 }}>
        <SideBar />
      </Box>
    </Box>
  );
}
