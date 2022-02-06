import { Box, Container, Heading, HStack, Image, useToken, VStack } from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import { useMemo } from 'react';
import {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryTheme,
} from 'victory';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { Category } from '../../../types/category';
import { Survey } from '../../../types/survey';
import { SurveyResult } from '../../../types/surveyResult';
import { SURVEY_RESULT_SCORE_GAP } from '../../../utils/calculateSurveyResult';

interface PoliticianGlobalScoreProps {
  politician: Politician;
  survey: Survey;
  results: SurveyResult;
}

export function PoliticianCategoriesChart(props: PoliticianGlobalScoreProps) {
  const { politician, survey, results } = props;

  const isMobile = useIsMobile();
  const [primary500, gray100] = useToken('colors', ['primary.500', 'gray.300']);

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

  const radarChart = useMemo(() => {
    if (!politician) {
      return {};
    }

    return survey.reduce<Record<Category['title'], number>>((acc, { id, title }) => {
      const categoryScores = results.categoriesScores.find(({ categoryId }) => categoryId === id);
      const politicianScore = categoryScores?.scores.find(
        ({ politicianId }) => politicianId === politician.id,
      );
      return {
        ...acc,
        [title.replace(' ', '\n')]: politicianScore ? politicianScore.score + 100 : 0,
      };
    }, {});
  }, [survey, results, politician]);

  const processData = (data: Record<Category['title'], number>) =>
    Object.keys(data).map(key => ({
      x: key,
      y: data[key] / SURVEY_RESULT_SCORE_GAP,
    }));

  return (
    <Container
      p={5}
      as={isMobile ? VStack : HStack}
      alignItems="center"
      justifyContent="center"
      spacing={10}
    >
      <Box>
        <Image src={politician.pictureUrl} alt={politician.name} width="300px" borderRadius={4} />
        <Heading>{politician.name}</Heading>
      </Box>

      <Box width="600px" maxWidth="full">
        <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
          <VictoryGroup colorScale={['gold', primary500]}>
            <VictoryArea
              data={processData(radarChartCategoryMax)}
              style={{ data: { fillOpacity: 0, strokeWidth: 0 } }}
            />
            <VictoryArea
              data={processData(radarChart)}
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
  );
}
