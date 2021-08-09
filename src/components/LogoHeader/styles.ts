import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      // padding: theme.spacing(1),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
