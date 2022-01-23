import { useEffect } from 'react';
import type { GetStaticProps } from 'next';
import { useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../../services/survey';
import Survey from '../../types/survey';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface SerialiazedCategoryProps {
  survey: string;
}

export const getStaticProps: GetStaticProps<SerialiazedCategoryProps> = async ({
  preview = false,
}) => {
  const survey = await fetchSurvey({ previewMode: preview });

  return {
    props: {
      survey: superjson.stringify(survey),
    },
  };
};

const Survey = (serializedProps: SerialiazedCategoryProps) => {
  const { replace } = useRouter();

  const survey = useMemo(
    () => superjson.parse<Survey>(serializedProps.survey),
    [serializedProps.survey],
  );

  useEffect(() => {
    replace(`/categories/${survey[0].slug}/questions/${survey[0].questions[0].order}`);
  }, [replace]);

  return (
    <Head>
      <title>JeVote</title>
      <meta
        name="description"
        content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Survey;
