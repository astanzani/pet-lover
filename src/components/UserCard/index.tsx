import React from 'react';
import { View } from 'react-native';
import { Avatar, Chip, Title, useTheme } from 'react-native-paper';

import getStyles from './styles';

export function UserCard() {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Chip avatar={<Avatar.Text size={24} label="AS" />} mode="flat">
      <Title>Arnaldo</Title>
    </Chip>
  );
}
