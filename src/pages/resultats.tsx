import { Box, Container, VStack } from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import superjson from 'superjson';
import { HomeLayout } from '../components/HomeLayout';
import { fetchPoliticians } from '../services/politicians';
import { fetchSurvey } from '../services/survey';
import { useSurveyStore } from '../stores/survey';
import { Survey, SurveyPoliticiansPossibleScores } from '../types/survey';
import { calculatePoliticianFactor } from '../utils/calculatePoliticianPossibleScores';
import Head from 'next/head';
import { PoliticianCategoriesChart } from '../components/Results/PoliticianCategoriesChart';
import { PoliticianGlobalScore } from '../components/Results/PoliticianGlobalScore';

interface SerializedResultsProps {
  survey: string;
  surveyPath: string;
  politicians: string;
  politicianPossibleScores: SurveyPoliticiansPossibleScores;
}

export const getStaticProps: GetStaticProps<SerializedResultsProps> = async ({
  preview = false,
}) => {
  const survey = await fetchSurvey({ previewMode: preview });
  const politicians = await fetchPoliticians();
  const firstCategory = survey[0];
  const firstQuestion = firstCategory.questions[0];
  const politicianPossibleScores = calculatePoliticianFactor(survey);

  return {
    props: {
      survey: superjson.stringify(survey),
      surveyPath: `/categories/${firstCategory.slug}/questions/${firstQuestion.order}`,
      politicians: superjson.stringify(
        politicians.reduce((acc, politician) => ({ ...acc, [politician.id]: politician }), {}),
      ),
      politicianPossibleScores,
    },
  };
};

function ResultsPage(serializedProps: SerializedResultsProps) {
  const { politicianPossibleScores, surveyPath } = serializedProps;

  const { push } = useRouter();

  const survey = useMemo(
    () => superjson.parse<Survey>(serializedProps.survey),
    [serializedProps.survey],
  );

  const politicians = useMemo(
    () => superjson.parse<Record<Politician['id'], Politician>>(serializedProps.politicians),
    [serializedProps.politicians],
  );

  const { calculateResult, findMissingAnswer } = useSurveyStore();

  useEffect(() => {
    const missingAnswer = findMissingAnswer(survey);

    if (missingAnswer) {
      push(`/categories/${missingAnswer.category.slug}/questions/${missingAnswer.question.order}`);
    }
  }, [findMissingAnswer, survey, push]);

  const results = useMemo(() => {
    return typeof window === 'undefined'
      ? { scores: [], categoriesScores: [] }
      : calculateResult(survey, politicianPossibleScores);
  }, [survey, politicianPossibleScores, calculateResult]);

  const favPolitician = results.scores[0] && politicians[results.scores[0].politicianId];

  if (!favPolitician) {
    return null;
  }

  return (
    <>
      <Head>
        <title>JeVote</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout surveyPath={surveyPath}>
        <Box>
          <PoliticianCategoriesChart politician={favPolitician} survey={survey} results={results} />
          <Container
            p={5}
            as={VStack}
            alignItems="center"
            justifyContent="center"
            spacing={10}
            width="600px"
            maxWidth="full"
          >
            {results.scores.map(({ politicianId, score }) => (
              <PoliticianGlobalScore
                key={politicianId}
                politician={politicians[politicianId]}
                score={score}
              />
            ))}
          </Container>
        </Box>
      </HomeLayout>
    </>
  );
}

export default ResultsPage;
