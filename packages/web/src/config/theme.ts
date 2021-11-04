import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    background: {
      default: '#fafafa',
    },
    primary: {
      main: '#5e35b1',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#15202b',
      paper: '#15202b',
    },
    primary: {
      main: '#5e35b1',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          borderColor: 'green',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: 'orange',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bd9cff',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#bd9cff',
          },
        },
      },
    },
  },
});
