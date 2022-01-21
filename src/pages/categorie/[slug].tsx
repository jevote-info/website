import { Container, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../../services/survey';
import Survey from '../../types/survey';
import SurveyLayout from '../../components/SurveyLayout';
import Question from '../../components/Question';

interface SerialiazedCategoryProps {
  survey: string;
  currentCategory: string;
  previousCategory: string | null;
  nextCategory: string | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const survey = await fetchSurvey();

  return {
    paths: survey.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<SerialiazedCategoryProps & SSRConfig> = async ({
  params,
  preview = false,
  locale = 'fr',
}) => {
  if (!params || !params.slug) {
    return {
      notFound: true,
    };
  }

  const survey = await fetchSurvey({ previewMode: preview });
  const currentCategory = survey.find(({ slug }) => slug === params.slug);

  if (!currentCategory) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      survey: superjson.stringify(survey),
      currentCategory: superjson.stringify(currentCategory),
      previousCategory: survey[survey.indexOf(currentCategory) - 1]
        ? superjson.stringify(survey[survey.indexOf(currentCategory) - 1])
        : null,
      nextCategory: survey[survey.indexOf(currentCategory) + 1]
        ? superjson.stringify(survey[survey.indexOf(currentCategory) + 1])
        : null,
      ...(await serverSideTranslations(locale)),
    },
  };
};

const CategoryPage = (serializedProps: SerialiazedCategoryProps) => {
  const titleColor = useColorModeValue('primary.900', 'secondary.200');
  const survey = useMemo(
    () => superjson.parse<Survey>(serializedProps.survey),
    [serializedProps.survey],
  );
  const currentCategory = useMemo(
    () => superjson.parse<Survey[number]>(serializedProps.currentCategory),
    [serializedProps.currentCategory],
  );
  const previousCategory = useMemo(
    () =>
      serializedProps.previousCategory &&
      superjson.parse<Survey[number]>(serializedProps.previousCategory),
    [serializedProps.previousCategory],
  );
  const nextCategory = useMemo(
    () =>
      serializedProps.nextCategory && superjson.parse<Survey[number]>(serializedProps.nextCategory),
    [serializedProps.nextCategory],
  );

  return (
    <SurveyLayout survey={survey} currentCategory={currentCategory}>
      <Container
        maxW="container.lg"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding="16px 8px"
      >
        <Heading color={titleColor} as="h1" marginBottom="32px">
          {currentCategory.title}
        </Heading>
        <VStack spacing="16px" alignItems="flex-start">
          {currentCategory.questions.map(question => (
            <Question key={question.id} question={question} />
          ))}
        </VStack>
        {previousCategory && <Link href={`/categorie/${previousCategory.slug}`}>Previous</Link>}
        {nextCategory ? (
          <Link href={`/categorie/${nextCategory.slug}`}>Next</Link>
        ) : (
          <Link href="/">Finish</Link>
        )}
      </Container>
    </SurveyLayout>
  );
};

export default CategoryPage;
