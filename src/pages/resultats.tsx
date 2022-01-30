import { Box } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../services/survey';
import { useSurveyStore } from '../stores/survey';
import { Survey, SurveyPoliticiansPossibleScores } from '../types/survey';
import { calculatePoliticianFactor } from '../utils/calculatePoliticianPossibleScores';

interface SerializedResultsProps {
  survey: string;
  politicianPossibleScores: SurveyPoliticiansPossibleScores;
}

export const getStaticProps: GetStaticProps<SerializedResultsProps> = async ({
  preview = false,
}) => {
  const survey = await fetchSurvey({ previewMode: preview });
  const politicianPossibleScores = calculatePoliticianFactor(survey);

  return {
    props: {
      survey: superjson.stringify(survey),
      politicianPossibleScores,
    },
  };
};

function ResultsPage(serializedProps: SerializedResultsProps) {
  const { politicianPossibleScores } = serializedProps;

  const survey = useMemo(
    () => superjson.parse<Survey>(serializedProps.survey),
    [serializedProps.survey],
  );

  const { calculateResult } = useSurveyStore();

  const results = useMemo(() => {
    return typeof window === 'undefined'
      ? { scores: [], categoriesScores: {} }
      : calculateResult(survey, politicianPossibleScores);
  }, [survey, politicianPossibleScores, calculateResult]);

  console.log(results);

  return <Box>{JSON.stringify(results)}</Box>;
}

export default ResultsPage;
