import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      position: 'relative',
    },
    avatar: {
      position: 'absolute',
      paddingLeft: 20,
    },
  });
