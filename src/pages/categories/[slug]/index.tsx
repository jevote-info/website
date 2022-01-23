import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { useEffect, useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../../../services/survey';
import Survey from '../../../types/survey';

interface SerialiazedCategoryProps {
  currentCategory: string;
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
      currentCategory: superjson.stringify(currentCategory),
    },
  };
};

const CategoryPage = (serializedProps: SerialiazedCategoryProps) => {
  const { replace } = useRouter();

  const currentCategory = useMemo(
    () => superjson.parse<Survey[number]>(serializedProps.currentCategory),
    [serializedProps.currentCategory],
  );

  useEffect(() => {
    replace(`/categories/${currentCategory.slug}/questions/${currentCategory.questions[0].order}`);
  });

  return (
    <Head>
      <title>JeVote - {currentCategory.title}</title>
      <meta name="description" content={currentCategory.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default CategoryPage;
