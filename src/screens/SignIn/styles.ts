import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      padding: theme.spacing(2),
    },
    contentWrapper: {
      flex: 1,
    },
    formWrapper: {
      flex: 1,
    },
    signUpWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      marginBottom: theme.spacing(1),
    },
    signInButton: {
      marginTop: theme.spacing(1),
    },
  });
