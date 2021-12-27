import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { BootstrapStores } from '../BootstrapStores';
import { appTheme } from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={appTheme}>
      <BootstrapStores>
        <Component {...pageProps} />
      </BootstrapStores>
    </ChakraProvider>
  );
}

export default MyApp;
