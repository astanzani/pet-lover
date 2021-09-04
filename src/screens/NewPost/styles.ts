import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: theme.spacing(2),
    },
    content: {
      flex: 1,
    },
    petPicker: {
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 8,
      padding: theme.spacing(1),
    },
    petPickerAvatar: {
      marginRight: theme.spacing(2),
    },
    chip: {
      padding: theme.spacing(1),
      alignItems: 'center',
      width: '50%',
    },
    petPickerModalContent: {
      padding: theme.spacing(2),
    },
    petPickerModalItemSelected: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
    },
  });
