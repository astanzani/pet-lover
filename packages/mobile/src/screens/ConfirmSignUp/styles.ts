import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: theme.spacing(2),
    },
    title: {
      alignSelf: 'center',
    },
    description: {
      alignSelf: 'center',
      textAlign: 'center',
    },
    confirmationWrapper: {
      flex: 1,
    },
    confirmationCodeInput: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  });
