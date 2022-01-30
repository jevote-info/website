import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { NextQueryParamProvider } from 'next-query-params';
import { BootstrapStores } from '../BootstrapStores';
import theme from '../theme';
import '@fontsource/quicksand/400.css';
import '@fontsource/quicksand/600.css';
import '@fontsource/quicksand/700.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <BootstrapStores>
        <NextQueryParamProvider>
          <Component {...pageProps} />
        </NextQueryParamProvider>
      </BootstrapStores>
    </ChakraProvider>
  );
}

export default MyApp;
