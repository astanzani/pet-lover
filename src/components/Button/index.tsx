import React from 'react';
import { Button as PaperButton, useTheme } from 'react-native-paper';

import getStyles from './styles';

type Props = React.ComponentProps<typeof PaperButton>;

export function Button({ children, ...props }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <PaperButton style={styles.root} {...props}>
      {children}
    </PaperButton>
  );
}
