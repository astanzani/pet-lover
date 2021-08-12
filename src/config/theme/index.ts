import { DefaultTheme } from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';

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
    interface ThemeColors {
      heart: string;
      white: string;
      black: string;
    }
    interface Theme {
      spacing: Spacing;
    }
  }
}

const baseTheme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    heart: '#F36B7E',
    white: '#FFF',
    black: '#000',
  },
  spacing: (s: number) => SPACING_MAP[s.toString()],
};

export const lightTheme: ReactNativePaper.Theme = {
  ...baseTheme,
  roundness: 8,
  colors: {
    ...baseTheme.colors,
    primary: '#5E35B1',
    accent: '#F48FB1',
  },
};

export function mapToNavigationTheme(
  theme: ReactNativePaper.Theme
): NavigationTheme {
  return {
    dark: theme.dark,
    colors: {
      ...NavigationDefaultTheme.colors,
      primary: theme.colors.primary,
    },
  };
}
