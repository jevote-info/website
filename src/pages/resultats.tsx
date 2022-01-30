import { Box, Image } from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import superjson from 'superjson';
import { fetchPoliticians } from '../services/politicians';
import { fetchSurvey } from '../services/survey';
import { useSurveyStore } from '../stores/survey';
import { Survey, SurveyPoliticiansPossibleScores } from '../types/survey';
import { calculatePoliticianFactor } from '../utils/calculatePoliticianPossibleScores';

interface SerializedResultsProps {
  survey: string;
  politicians: string;
  politicianPossibleScores: SurveyPoliticiansPossibleScores;
}

export const getStaticProps: GetStaticProps<SerializedResultsProps> = async ({
  preview = false,
}) => {
  const survey = await fetchSurvey({ previewMode: preview });
  const politicians = await fetchPoliticians();
  const politicianPossibleScores = calculatePoliticianFactor(survey);

  return {
    props: {
      survey: superjson.stringify(survey),
      politicians: superjson.stringify(
        politicians.reduce((acc, politician) => ({ ...acc, [politician.id]: politician }), {}),
      ),
      politicianPossibleScores,
    },
  };
};

function ResultsPage(serializedProps: SerializedResultsProps) {
  const { politicianPossibleScores } = serializedProps;

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
      ? { scores: [], categoriesScores: {} }
      : calculateResult(survey, politicianPossibleScores);
  }, [survey, politicianPossibleScores, calculateResult]);

  console.log(results);
  console.log(politicians);

  const favPolitician = results.scores[0] && politicians[results.scores[0].politicianId];

  if (!favPolitician) {
    return null;
  }

  return (
    <Box>
      {favPolitician.name}
      <Image src={favPolitician.pictureUrl} alt={favPolitician.name} />
    </Box>
  );
}

export default ResultsPage;
