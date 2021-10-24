import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Person, Home, Pets } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import logo from 'assets/pet-lover-logo.png';
import { Routes } from 'config';

interface Props {
  activeItem: Routes.HOME | Routes.PETS | Routes.PROFILE;
}

export function LeftNav({ activeItem }: Props) {
  return (
    <Box sx={{ flex: 1 }}>
      <img height={50} src={logo} alt="Pet Lover logo" />
      <List>
        <ListItem>
          <ListItemButton
            component={Link}
            to={Routes.HOME}
            selected={activeItem === Routes.HOME}
          >
            <ListItemIcon>
              <Home fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            to={Routes.PROFILE}
            selected={activeItem === Routes.PROFILE}
          >
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            to={Routes.PETS}
            selected={activeItem === Routes.PETS}
          >
            <ListItemIcon>
              <Pets fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Pets" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
