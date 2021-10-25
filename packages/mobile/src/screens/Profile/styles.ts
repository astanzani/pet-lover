import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      padding: theme.spacing(2),
      flex: 1,
    },
    userMainInfo: {
      alignItems: 'center',
    },
    followingSection: {
      borderRadius: theme.spacing(1),
      padding: theme.spacing(1),
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    followingAvatars: {
      flexDirection: 'row',
    },
    avatar: {
      marginRight: theme.spacing(1),
    },
  });
