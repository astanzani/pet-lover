import React from 'react';
import { useQuery } from '@apollo/client';
import { Avatar, Chip, Title, useTheme } from 'react-native-paper';

import { GET_ME } from '@graphql/queries';
import { User } from '@types';
import getStyles from './styles';

export function UserCard() {
  const { data, loading, error } = useQuery<{ me: User }>(GET_ME);
  const theme = useTheme();
  const styles = getStyles(theme);

  if (loading) {
    return null;
  }

  if (error || !data) {
    throw new Error('Could not fetch user info!');
  }

  return (
    <Chip
      avatar={<Avatar.Text size={24} label={getInitials(data.me.name)} />}
      mode="flat"
    >
      <Title>{getFirstName(data.me.name)}</Title>
    </Chip>
  );
}

function getInitials(name: string) {
  const split = name.split(' ');

  if (split.length === 1) {
    return split[0];
  }

  return split[0].charAt(0) + split[1].charAt(0);
}

function getFirstName(name: string) {
  return name.split(' ')[0];
}
