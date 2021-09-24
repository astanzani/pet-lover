import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      padding: theme.spacing(1),
    },
    button: {
      marginTop: theme.spacing(2),
    },
  });
