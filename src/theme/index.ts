import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { globalStyles } from './globalStyles';

const config: ThemeConfig = {
  initialColorMode: 'system',
};

const theme = extendTheme({
  config,
  styles: {
    global: globalStyles,
  },
  colors: {
    primary: {
      50: '#eaebf8',
      100: '#cacded',
      200: '#a7ace0',
      300: '#848cd4',
      400: '#6a71ca',
      500: '#5257c0',
      600: '#4c4fb6',
      700: '#4344a9',
      800: '#3c3a9d',
      900: '#2f2788', // Logo primary color
    },
    secondary: {
      50: '#fbe6e3',
      100: '#fcc5b2',
      200: '#f99f81', // Logo secondary color
      300: '#f47a50',
      400: '#f05d2b',
      500: '#ec3f00',
      600: '#e23a00',
      700: '#d53300',
      800: '#c72b00',
      900: '#ae1d00',
    },
  },
});

export default theme;
