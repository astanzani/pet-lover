import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      marginTop: theme.spacing(1),
    },
    actions: {
      justifyContent: 'space-between',
    },
    actionButtonGroup: {
      flexDirection: 'row',
    },
  });
