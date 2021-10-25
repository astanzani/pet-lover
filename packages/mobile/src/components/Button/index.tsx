import React from 'react';
import { ViewStyle } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';

import getStyles from './styles';

type Props = React.ComponentProps<typeof PaperButton>;

export function Button({ children, style, ...props }: Props) {
  const theme = useTheme();
  const innerStyle = getStyles(theme);

  const mergedStyle = style
    ? { ...innerStyle.root, ...(style as ViewStyle) }
    : innerStyle.root;

  return (
    <PaperButton style={mergedStyle} {...props}>
      {children}
    </PaperButton>
  );
}
