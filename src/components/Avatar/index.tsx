import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Avatar as PaperAvatar } from 'react-native-paper';

interface Props {
  picture?: string;
  fallbackIcon?: string;
  fallbackName?: string;
  styles?: StyleProp<ViewStyle>;
}

export function Avatar({ picture, fallbackIcon, fallbackName, styles }: Props) {
  const icon = fallbackIcon ?? 'account';

  return picture ? (
    <PaperAvatar.Image size={50} source={{ uri: picture }} style={styles} />
  ) : fallbackName ? (
    <PaperAvatar.Text
      size={50}
      label={getInitials(fallbackName)}
      style={styles}
    />
  ) : (
    <PaperAvatar.Icon size={50} icon={icon} style={styles} />
  );
}

function getInitials(name: string) {
  const split = name.split(' ');

  if (split.length === 1) {
    return split[0];
  }

  return split[0].charAt(0) + split[1].charAt(0);
}
