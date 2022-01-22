import { useEffect } from 'react';
import type { GetStaticProps } from 'next';
import { useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../../services/survey';
import Survey from '../../types/survey';
import { useRouter } from 'next/router';

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
    replace(`/categorie/${survey[0].slug}`);
  }, [replace]);

  return null;
};

export default Survey;
