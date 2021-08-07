import { DefaultTheme } from 'react-native-paper';

type Spacing = (spacing: number) => number;

const SPACING_MAP: { [key: string]: number } = {
  0: 0,
  1: 8,
  2: 16,
  3: 24,
  4: 32,
};

declare global {
  namespace ReactNativePaper {
    interface Theme {
      spacing: Spacing;
    }
  }
}

const baseTheme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  spacing: (s: number) => SPACING_MAP[s.toString()],
};

export const lightTheme: ReactNativePaper.Theme = {
  ...baseTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5e35b1',
    accent: '#f48fb1',
  },
};
