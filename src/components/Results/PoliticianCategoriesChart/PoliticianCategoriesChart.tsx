import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Heading,
  HStack,
  useToken,
  VStack,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import { useMemo } from 'react';
import {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { Survey } from '../../../types/survey';
import { SurveyResult } from '../../../types/surveyResult';
import { SURVEY_RESULT_SCORE_GAP } from '../../../utils/calculateSurveyResult';
import { PoliticianPicture } from '../PoliticianPicture';

interface PoliticianGlobalScoreProps {
  politician: Politician;
  survey: Survey;
  results: SurveyResult;
}

export function PoliticianCategoriesChart(props: PoliticianGlobalScoreProps) {
  const { politician, survey, results } = props;

  const isMobile = useIsMobile();
  const [primary500, gray100] = useToken('colors', ['primary.500', 'gray.300']);
  const axisFillColor = useColorModeValue('#1A202C', 'rgba(255, 255, 255, 0.92)');

  const radarChartCategoryMax = useMemo(
    () =>
      survey.map(category => ({
        x: category.title,
        y: SURVEY_RESULT_SCORE_GAP,
      })),
    [survey],
  );

  const radarChart = useMemo(() => {
    if (!politician) {
      return [];
    }

    return survey.map(category => {
      const categoryScores = results.categoriesScores.find(
        ({ categoryId }) => categoryId === category.id,
      );
      const politicianScore = categoryScores?.scores.find(
        ({ politicianId }) => politicianId === politician.id,
      );
      const categoryScore =
        (politicianScore ? politicianScore.score + 100 : 0) / SURVEY_RESULT_SCORE_GAP;

      return {
        x: category.title,
        y: categoryScore,
        label: `${categoryScore}%`,
      };
    });
  }, [survey, results, politician]);

  const score = useMemo(() => {
    return results.scores.find(({ politicianId }) => politicianId === politician.id)?.score || 0;
  }, [results, politician]);

  return (
    <Container
      p={5}
      as={isMobile ? VStack : HStack}
      alignItems="center"
      justifyContent="space-between"
      maxW="container.lg"
    >
      <Box maxW="300px">
        <PoliticianPicture politician={politician} size="big" />

        <Heading>{politician.name}</Heading>
        <Heading size="md">{politician.politicalParty}</Heading>
        <Heading mt={3} size="lg">
          Score :{' '}
          <Text as="span" color={score > 0 ? 'primary.500' : 'secondary.500'}>
            {score}
          </Text>
        </Heading>
        <Text mt={3} mb={3}>
          {politician.description}
        </Text>
        <Link href={politician.programUrl} isExternal fontWeight="bold">
          Lire son programme <ExternalLinkIcon />
        </Link>
      </Box>

      <Box width={[300, 350, 500]} maxWidth="full">
        <VictoryChart
          polar
          theme={VictoryTheme.material}
          domain={{ y: [0, 1] }}
          animate={{ duration: 700, easing: 'exp' }}
        >
          <VictoryGroup colorScale={['gold', primary500]}>
            <VictoryArea
              data={radarChartCategoryMax}
              style={{ data: { fillOpacity: 0, strokeWidth: 0 } }}
            />
            <VictoryArea
              labelComponent={<VictoryTooltip />}
              data={radarChart}
              style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
            />
          </VictoryGroup>

          {survey.map((category, index) => (
            <VictoryPolarAxis
              key={category.slug}
              dependentAxis
              style={{
                axisLabel: { padding: 10, fill: axisFillColor },
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
