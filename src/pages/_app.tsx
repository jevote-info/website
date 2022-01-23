import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { BootstrapStores } from '../BootstrapStores';
import MainLayout from '../components/MainLayout';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <BootstrapStores>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </BootstrapStores>
    </ChakraProvider>
  );
}

export default MyApp;
