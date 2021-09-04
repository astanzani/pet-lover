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
      padding: theme.spacing(2),
    },
    plusButton: {
      position: 'absolute',
      margin: theme.spacing(3),
      right: 0,
      bottom: 0,
    },
    petCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(1),
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: theme.spacing(1),
    },
    petAvatar: {
      marginRight: theme.spacing(2),
    },
  });
