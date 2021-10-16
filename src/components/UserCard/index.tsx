import React from 'react';
import { Avatar, Chip, Title } from 'react-native-paper';

import { useMeQuery } from '@generated/graphql';

export function UserCard() {
  const { data, loading, error } = useMeQuery();

  if (loading) {
    return null;
  }

  if (error || !data) {
    console.error(error);
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
