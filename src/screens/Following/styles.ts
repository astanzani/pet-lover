import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      padding: theme.spacing(2),
      flex: 1,
    },
    unfollowPetCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
      borderWidth: 1,
      marginBottom: theme.spacing(1),
    },
    unfollowPetCardPetInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    unfollowPetCardPetAvatar: {
      marginRight: theme.spacing(1),
    },
  });
