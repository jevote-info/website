import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { BootstrapStores } from '../BootstrapStores';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <BootstrapStores>
        <Component {...pageProps} />
      </BootstrapStores>
    </ChakraProvider>
  );
}

export default MyApp;
