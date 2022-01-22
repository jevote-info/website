import { Box, Button, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../../services/survey';
import Survey from '../../types/survey';

interface SerialiazedCategoryProps {
  survey: string;
}

export const getStaticProps: GetStaticProps<SerialiazedCategoryProps> = async ({
  preview = false,
}) => {
  const survey = await fetchSurvey({ previewMode: preview });

  return {
    props: {
      survey: superjson.stringify(survey),
    },
  };
};

const Survey = (serializedProps: SerialiazedCategoryProps) => {
  const survey = useMemo(
    () => superjson.parse<Survey>(serializedProps.survey),
    [serializedProps.survey],
  );

  return (
    <Box w="100%">
      <Head>
        <title>JeVote</title>
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
            aria-label="Démarrer le questionnaire"
            marginY="2px"
            width="100%"
          >
            Démarrer le questionnaire
          </Button>
        </NextLink>
      </Container>
    </Box>
  );
};

export default Survey;
