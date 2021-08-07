import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: theme.spacing(2),
    },
    input: {
      marginBottom: theme.spacing(1),
    },
  });
