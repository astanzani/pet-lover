import React from 'react';
import {
  Box,
  ButtonBase,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Logout,
  Person,
  Home,
  Pets,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Auth } from '@aws-amplify/auth';
import { useApolloClient } from '@apollo/client';

import logo from 'assets/pet-lover-logo.png';
import { Routes } from 'config';
import { useMenuToggle } from 'hooks';

interface Props {
  activeItem: Routes.HOME | Routes.PETS | Routes.PROFILE;
}

export function LeftNav({ activeItem }: Props) {
  const theme = useTheme();
  const apolloClient = useApolloClient();
  const [anchorEl, open, close] = useMenuToggle();

  const logout = async () => {
    await Auth.signOut();
    await apolloClient.resetStore();
  };

  return (
    <Box display="flex" flex="1">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          position: 'fixed',
          height: '100%',
        }}
      >
        <Box>
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
        <Box sx={{ alignSelf: 'center' }}>
          <ButtonBase onClick={open}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                borderRadius: 8,
                ':hover': {
                  background: theme.palette.background.paper,
                },
              }}
            >
              <Avatar
                sx={{ width: 32, height: 32, fontSize: 16, marginRight: 2 }}
              >
                AS
              </Avatar>
              Arnaldo Stanzani
              <KeyboardArrowUp sx={{ marginLeft: 2 }} />
            </Box>
          </ButtonBase>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={close}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            <MenuItem onClick={logout}>
              <Logout fontSize="small" sx={{ marginRight: 2 }} />
              Sign out
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
