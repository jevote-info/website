import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
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
import { Category } from '../types/category';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { PoliticiansPodium } from '../components/Results/PoliticiansPodium';
import { DetailedResults } from '../components/Results/DetailedResults';

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

  const { calculateResult, findMissingAnswer, result, answers } = useSurveyStore();

  useEffect(() => {
    const missingAnswer = findMissingAnswer(survey);

    if (missingAnswer) {
      push(`/categories/${missingAnswer.category.slug}/questions/${missingAnswer.question.order}`);
    } else {
      calculateResult(survey, politicianPossibleScores);
    }
  }, [findMissingAnswer, survey, push, calculateResult, politicianPossibleScores]);

  const favPolitician = result?.scores[0] && politicians[result.scores[0].politicianId];
  const topThreePoliticians = useMemo(() => {
    return result?.scores.slice(0, 3).map(({ politicianId }) => politicians[politicianId]) || [];
  }, [result, politicians]);

  const [selectedPolitician, setSelectedPolitician] = useState(favPolitician);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  if (!favPolitician) {
    return null;
  }

  return (
    <>
      <Head>
        <title>jevote.info</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout surveyPath={surveyPath}>
        <Box height="full">
          <PoliticiansPodium politicians={topThreePoliticians} nextSectionId="graphique" />
          <Box id="graphique">
            {selectedPolitician && (
              <PoliticianCategoriesChart
                politician={selectedPolitician}
                survey={survey}
                results={result}
              />
            )}
          </Box>
          <Container p={5} as={VStack} alignItems="start" spacing={5} maxW="container.lg">
            <Stack
              justify="space-between"
              align="flex-start"
              direction={['column', 'column', 'row']}
            >
              <Heading as="h3" size="md" maxW="600">
                Découvrez votre affinité envers chaque candidat pour chaque catégorie
              </Heading>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {selectedCategory?.title || 'Général'}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setSelectedCategory(null)}>Général</MenuItem>
                  {survey.map(category => (
                    <MenuItem key={category.id} onClick={() => setSelectedCategory(category)}>
                      {category.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Stack>
            {result.scores.map(({ politicianId, score }) => {
              const categoryScores = result.categoriesScores.find(
                ({ categoryId }) => categoryId === selectedCategory?.id,
              );
              const politicianScore = categoryScores?.scores.find(
                categoryScore => categoryScore.politicianId === politicianId,
              );
              const categoryScore = politicianScore ? politicianScore.score : 0;

              return (
                <PoliticianGlobalScore
                  key={politicianId}
                  politician={politicians[politicianId]}
                  score={selectedCategory ? categoryScore : score}
                  onClick={() => setSelectedPolitician(politicians[politicianId])}
                />
              );
            })}
          </Container>
          <Container p={5} maxW="container.lg">
            <DetailedResults survey={survey} answers={answers} politicians={politicians} />
          </Container>
        </Box>
      </HomeLayout>
    </>
  );
}

export default ResultsPage;
