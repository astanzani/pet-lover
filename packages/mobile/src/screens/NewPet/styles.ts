import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: theme.spacing(2),
    },
    avatarWrapper: {
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    input: {
      marginBottom: theme.spacing(2),
    },
    plusButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    picDialogContent: {
      alignItems: 'flex-start',
    },
  });
