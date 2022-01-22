import { Container, Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { useCallback, useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../../services/survey';
import Survey from '../../types/survey';
import { SurveyLayout } from '../../components/SurveyLayout';
import { Importance } from '../../components/ImportanceMeter';
import { useRouter } from 'next/router';
import { useSurveyStore } from '../../stores/survey';
import Answers from '../../types/answers';
import { CategoryForm } from '../../forms/CategoryForm';
import Category from '../../types/category';

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

export const getStaticProps: GetStaticProps<SerialiazedCategoryProps> = async ({
  params,
  preview = false,
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
    },
  };
};

const CategoryPage = (serializedProps: SerialiazedCategoryProps) => {
  const { push } = useRouter();

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
      serializedProps.previousCategory
        ? superjson.parse<Survey[number]>(serializedProps.previousCategory)
        : null,
    [serializedProps.previousCategory],
  );
  const nextCategory = useMemo(
    () =>
      serializedProps.nextCategory
        ? superjson.parse<Survey[number]>(serializedProps.nextCategory)
        : null,
    [serializedProps.nextCategory],
  );

  const { answers, setCategoryAnswers } = useSurveyStore();

  const defaultValues = useMemo<Answers[Category['id']]>(() => {
    const categoryAnswer = answers[currentCategory.id];

    return currentCategory.questions.reduce(
      (acc, question) => ({
        [question.id]: {
          choiceId: categoryAnswer?.[question.id].choiceId ?? null,
          weight: categoryAnswer?.[question.id].weight ?? Importance.NEUTRAL,
        },
        ...acc,
      }),
      {},
    );
  }, [currentCategory, answers]);

  const onSubmit = useCallback(
    (formValues: Answers[Category['id']]) => {
      console.log('onSubmit');
      setCategoryAnswers(currentCategory.id, formValues);
      if (nextCategory) {
        push(`/categorie/${nextCategory.slug}`);
      } else {
        push(`/resultats`);
      }
    },
    [currentCategory],
  );

  return (
    <>
      <Head>
        <title>JeVote - {currentCategory.title}</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SurveyLayout survey={survey} currentCategory={currentCategory}>
        <Container
          maxW="container.lg"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          p={0}
        >
          <CategoryForm
            key={
              currentCategory.id /* Important so that form gets regenerated between two categories */
            }
            currentCategory={currentCategory}
            nextCategory={nextCategory}
            previousCategory={previousCategory}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
          />
        </Container>
      </SurveyLayout>
    </>
  );
};

export default CategoryPage;
