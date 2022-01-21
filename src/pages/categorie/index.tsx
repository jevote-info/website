import { Box, Button, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useTranslation, SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../../services/survey';
import Survey from '../../types/survey';

interface SerialiazedCategoryProps {
  survey: string;
}

export const getStaticProps: GetStaticProps<SerialiazedCategoryProps & SSRConfig> = async ({
  preview = false,
  locale = 'fr',
}) => {
  const survey = await fetchSurvey({ previewMode: preview });

  return {
    props: {
      survey: superjson.stringify(survey),
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Survey = (serializedProps: SerialiazedCategoryProps) => {
  const { t } = useTranslation();

  const survey = useMemo(
    () => superjson.parse<Survey>(serializedProps.survey),
    [serializedProps.survey],
  );

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
        <Heading as="h1" _hover={{ fontSize: 44 }} transition="all 200ms ease">
          Survey
        </Heading>
        <NextLink href={`/categorie/${survey[0].slug}`} passHref>
          <Button
            as="a"
            colorScheme="blue"
            aria-label={t('startSurvey')}
            marginY="2px"
            width="100%"
          >
            {t('startSurvey')}
          </Button>
        </NextLink>
      </Container>
    </Box>
  );
};

export default Survey;
