import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      padding: theme.spacing(1),
    },
    petsList: {
      flex: 1,
    },
    petListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
    },
    petAvatar: {
      marginRight: theme.spacing(2),
    },
    petInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
