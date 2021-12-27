import { Container, Heading, HStack, ListItem, OrderedList } from '@chakra-ui/react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../../services/survey';
import { Survey } from '../../types/survey';

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

export const getStaticProps: GetStaticProps<SerialiazedCategoryProps> = async context => {
  const { params, preview = false } = context;

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
  // const survey = useMemo(() => superjson.parse<Survey>(props.survey), [props.survey]);
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
    <Container h="full" display="flex" flexDirection="column" justifyContent="center">
      <Heading>Category {currentCategory.title}</Heading>
      <HStack spacing={4}>
        {previousCategory && <Link href={`/categorie/${previousCategory.slug}`}>Previous</Link>}
        <Link href="/">Back home</Link>
        {nextCategory ? (
          <Link href={`/categorie/${nextCategory.slug}`}>Next</Link>
        ) : (
          <Link href="/">Finish</Link>
        )}
      </HStack>
      <OrderedList>
        {currentCategory.questions.map(question => (
          <ListItem key={question.id}>{question.title}</ListItem>
        ))}
      </OrderedList>
    </Container>
  );
};

export default CategoryPage;
