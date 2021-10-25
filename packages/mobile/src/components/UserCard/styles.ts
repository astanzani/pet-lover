import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      // padding: theme.spacing(1),
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
