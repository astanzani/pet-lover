import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    noPetsWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
    },
    plusButton: {
      position: 'absolute',
      margin: theme.spacing(3),
      right: 0,
      bottom: 0,
    },
  });
