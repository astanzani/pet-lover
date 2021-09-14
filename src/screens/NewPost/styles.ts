import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: theme.spacing(2),
    },
    scroll: {
      flexGrow: 1,
    },
    content: {
      justifyContent: 'space-between',
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
    toolbar: {
      flexDirection: 'row',
    },
    toolbarIcon: {
      marginHorizontal: 0,
    },
    imagesContainer: {
      // flex: 1,
      width: '100%',
      height: 400,
      flexDirection: 'row',
    },
    imagePreview: {
      flex: 1,
      resizeMode: 'cover',
      // width: '100%',
      // height: 100,
    },
    moreImagesContainer: {
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      marginVertical: theme.spacing(2),
    },
  });
