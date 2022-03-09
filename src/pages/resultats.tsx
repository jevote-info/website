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
  useDisclosure,
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
import { Survey } from '../types/survey';
import Head from 'next/head';
import { PoliticianCategoriesChart } from '../components/Results/PoliticianCategoriesChart';
import { PoliticianGlobalScore } from '../components/Results/PoliticianGlobalScore';
import { Category } from '../types/category';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { DetailedResults } from '../components/Results/DetailedResults';
import { PoliticiansPodiumHero } from '../components/Results/PoliticiansPodiumHero';
import { SharingDialog } from '../components/Results/SharingDialog';

interface SerializedResultsProps {
  survey: string;
  surveyPath: string;
  politicians: string;
}

export const getStaticProps: GetStaticProps<SerializedResultsProps> = async ({
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

function ResultsPage(serializedProps: SerializedResultsProps) {
  const { surveyPath } = serializedProps;
  const {
    isOpen: isSharingModalOpen,
    onOpen: onSharingModalOpen,
    onClose: onSharingModalClose,
  } = useDisclosure();

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
      calculateResult(survey);
    }
  }, [findMissingAnswer, survey, push, calculateResult]);

  const favPolitician = result?.scores[0] && politicians[result.scores[0].politicianId];
  const topThreePoliticians = useMemo(() => {
    return result?.scores.slice(0, 3).map(({ politicianId }) => politicians[politicianId]) || [];
  }, [result, politicians]);

  const hasPositiveScores = useMemo(() => {
    return !!result?.scores.find(({ score }) => score > 0);
  }, [result]);

  const [selectedPolitician, setSelectedPolitician] = useState(favPolitician);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  if (!favPolitician) {
    return null;
  }

  return (
    <>
      <Head>
        <title>jevote.info - Résultats</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
      </Head>
      <HomeLayout surveyPath={surveyPath}>
        <Box height="full">
          <PoliticiansPodiumHero
            politicians={topThreePoliticians}
            hasPositiveScores={hasPositiveScores}
            onSharingModalOpen={onSharingModalOpen}
          />
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
              w="full"
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
          <SharingDialog
            open={isSharingModalOpen}
            onClose={onSharingModalClose}
            politicians={topThreePoliticians}
          />
        </Box>
      </HomeLayout>
    </>
  );
}

export default ResultsPage;
