import { Box, Container, Heading } from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps<SSRConfig> = async ({ locale = 'fr' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Home = () => {
  const { t } = useTranslation();

  return (
    <Box w="100%">
      <Head>
        <title>{t('title')}</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        h="full"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap={4}
      >
        <Heading _hover={{ fontSize: 44 }} transition="all 200ms ease">
          Home
        </Heading>
      </Container>
    </Box>
  );
};

export default Home;
