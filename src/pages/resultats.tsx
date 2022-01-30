import { Box, Container, Heading, HStack, Image, useToken, VStack } from '@chakra-ui/react';
import { Category, Politician } from '@prisma/client';
import {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryTheme,
} from 'victory';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import superjson from 'superjson';
import { fetchPoliticians } from '../services/politicians';
import { fetchSurvey } from '../services/survey';
import { useSurveyStore } from '../stores/survey';
import { Survey, SurveyPoliticiansPossibleScores } from '../types/survey';
import { calculatePoliticianFactor } from '../utils/calculatePoliticianPossibleScores';
import { SURVEY_RESULT_SCORE_GAP } from '../utils/calculateSurveyResult';
import { useIsMobile } from '../hooks/useIsMobile';

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
      ? { scores: [], categoriesScores: [] }
      : calculateResult(survey, politicianPossibleScores);
  }, [survey, politicianPossibleScores, calculateResult]);

  const radarChartCategoryMax = useMemo(
    () =>
      survey.reduce<Record<Category['title'], number>>(
        (acc, { title }) => ({
          ...acc,
          [title.replace(' ', '\n')]: SURVEY_RESULT_SCORE_GAP,
        }),
        {},
      ),
    [survey],
  );

  const favPolitician = results.scores[0] && politicians[results.scores[0].politicianId];

  const radarChartFavPolitician = useMemo(() => {
    if (!favPolitician) {
      return {};
    }

    return survey.reduce<Record<Category['title'], number>>((acc, { id, title }) => {
      const categoryScores = results.categoriesScores.find(({ categoryId }) => categoryId === id);
      const politicianScore = categoryScores?.scores.find(
        ({ politicianId }) => politicianId === favPolitician.id,
      );
      return {
        ...acc,
        [title.replace(' ', '\n')]: politicianScore ? politicianScore.score + 100 : 0,
      };
    }, {});
  }, [survey, results, favPolitician]);

  console.log(results);
  console.log(politicians);

  const isMobile = useIsMobile();
  const [primary500, gray100] = useToken('colors', ['primary.500', 'gray.300']);

  if (!favPolitician) {
    return null;
  }

  const processData = (data: Record<Category['title'], number>) =>
    Object.keys(data).map(key => ({
      x: key,
      y: data[key] / SURVEY_RESULT_SCORE_GAP,
    }));

  return (
    <Box>
      <Container
        p={5}
        as={isMobile ? VStack : HStack}
        alignItems="center"
        justifyContent="center"
        spacing={10}
      >
        <Box>
          <Image
            src={favPolitician.pictureUrl}
            alt={favPolitician.name}
            width="300px"
            borderRadius={4}
          />
          <Heading>{favPolitician.name}</Heading>
        </Box>

        <Box width="600px" maxWidth="full">
          <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
            <VictoryGroup colorScale={['gold', primary500]}>
              <VictoryArea
                data={processData(radarChartCategoryMax)}
                style={{ data: { fillOpacity: 0, strokeWidth: 0 } }}
              />
              <VictoryArea
                data={processData(radarChartFavPolitician)}
                style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
              />
            </VictoryGroup>

            {survey.map((category, index) => (
              <VictoryPolarAxis
                key={category.slug}
                dependentAxis
                style={{
                  axisLabel: { padding: 10 },
                  axis: { stroke: 'none' },
                  grid: { stroke: gray100, strokeWidth: 0.25, opacity: 0.5 },
                }}
                tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
                labelPlacement="perpendicular"
                axisValue={index + 1}
                label={category.slug}
                axisLabelComponent={<VictoryLabel text={category.slug.split('-')} />}
                tickFormat={() => ''}
                tickValues={[0.25, 0.5, 0.75, 1]}
              />
            ))}
          </VictoryChart>
        </Box>
      </Container>
    </Box>
  );
}

export default ResultsPage;
