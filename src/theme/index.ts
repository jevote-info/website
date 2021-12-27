import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './globalStyles';

export const appTheme = extendTheme({
  styles: {
    global: globalStyles,
  },
});
