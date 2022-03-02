import { Container, VStack } from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';
import superjson from 'superjson';
import { HomeLayout } from '../components/HomeLayout';
import { DetailedResults } from '../components/Results/DetailedResults';
import { fetchPoliticians } from '../services/politicians';
import { fetchSurvey } from '../services/survey';
import { Survey } from '../types/survey';

interface SerializedSourceProps {
  survey: string;
  surveyPath: string;
  politicians: string;
}

export const getStaticProps: GetStaticProps<SerializedSourceProps> = async ({
  preview = false,
}) => {
  const survey = await fetchSurvey({ previewMode: preview });
  const politicians = await fetchPoliticians();
  const firstCategory = survey[0];
  const firstQuestion = firstCategory.questions[0];

  return {
    props: {
      survey: superjson.stringify(survey),
      surveyPath: `/categories/${firstCategory.slug}/questions/${firstQuestion.order}`,
      politicians: superjson.stringify(
        politicians.reduce((acc, politician) => ({ ...acc, [politician.id]: politician }), {}),
      ),
    },
  };
};

function SourcesPage(serializedProps: SerializedSourceProps) {
  const { surveyPath } = serializedProps;

  const survey = useMemo(
    () => superjson.parse<Survey>(serializedProps.survey),
    [serializedProps.survey],
  );

  const politicians = useMemo(
    () => superjson.parse<Record<Politician['id'], Politician>>(serializedProps.politicians),
    [serializedProps.politicians],
  );

  return (
    <>
      <Head>
        <title>jevote.info - Sources</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
      </Head>
      <HomeLayout surveyPath={surveyPath}>
        <Container p={5} as={VStack} alignItems="start" spacing={5} maxW="container.lg">
          <DetailedResults survey={survey} politicians={politicians} />
        </Container>
      </HomeLayout>
    </>
  );
}

export default SourcesPage;
