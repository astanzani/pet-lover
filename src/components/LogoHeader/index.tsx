import React from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

import getStyles from './styles';

interface Props {
  right?: React.ReactNode;
}

export function LogoHeader({ right }: Props) {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.root}>
      <Image
        source={require('../../../assets/pet-lover-logo.png')}
        resizeMode="contain"
        style={{
          width: width / 2.2,
          height: 'auto',
        }}
      />
      {right ? right : null}
    </View>
  );
}
