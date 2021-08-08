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
