import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Avatar as PaperAvatar } from 'react-native-paper';

export interface Props {
  picture?: string | null;
  fallbackIcon?: string;
  fallbackName?: string;
  styles?: StyleProp<ViewStyle>;
  size?: number;
}

export function Avatar({
  picture,
  fallbackIcon,
  fallbackName,
  size = 50,
  styles,
}: Props) {
  const icon = fallbackIcon ?? 'account';

  return picture ? (
    <PaperAvatar.Image size={size} source={{ uri: picture }} style={styles} />
  ) : fallbackName ? (
    <PaperAvatar.Text
      size={size}
      label={getInitials(fallbackName)}
      style={styles}
    />
  ) : (
    <PaperAvatar.Icon size={size} icon={icon} style={styles} />
  );
}

function getInitials(name: string) {
  const split = name.split(' ');

  if (split.length === 1) {
    return split[0];
  }

  return split[0].charAt(0) + split[1].charAt(0);
}
