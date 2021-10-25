import { StyleSheet } from 'react-native';

export default (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    root: {
      width: '100%',
      height: 400,
    },
    imageWrapper: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    optionsDialog: {
      alignItems: 'flex-start',
    },
  });
