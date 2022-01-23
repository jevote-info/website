import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { useCallback, useEffect, useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../../../../services/survey';
import { Survey, SurveyPoliticiansPossibleScores } from '../../../../types/survey';
import { SurveyLayout } from '../../../../components/SurveyLayout';
import { useRouter } from 'next/router';
import { useSurveyStore } from '../../../../stores/survey';
import { QuestionAnswer } from '../../../../types/answers';
import { QuestionForm } from '../../../../forms/QuestionForm';
import { Category } from '../../../../types/category';
import { Question } from '../../../../types/question';
import { AnimatePresence, motion } from 'framer-motion';
import { calculatePoliticianFactor } from '../../../../utils/calculateSurveyResult';
import { Importance } from '../../../../components/ImportanceMeter';

interface SerializedCategoryProps {
  survey: string;
  politiciansPossibleScores: string;
  currentQuestion: string;
  currentCategory: string;
  previousPath: string | null;
  nextPath: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const survey = await fetchSurvey();

  const paths = survey.flatMap(category =>
    category.questions.map(question => ({
      params: { slug: category.slug, questionOrder: `${question.order}` },
    })),
  );

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<SerializedCategoryProps> = async ({
  params,
  preview = false,
}) => {
  if (!params || !params.slug || !params.questionOrder) {
    return {
      notFound: true,
    };
  }

  const survey = await fetchSurvey({ previewMode: preview });
  const politiciansPossibleScores = calculatePoliticianFactor(survey);

  const currentCategory = survey.find(({ slug }) => slug === params.slug);

  if (!currentCategory) {
    return {
      notFound: true,
    };
  }

  const currentQuestion = currentCategory.questions.find(
    ({ order }) => `${order}` === params.questionOrder,
  );

  if (!currentQuestion) {
    return {
      notFound: true,
    };
  }

  const nextQuestion =
    currentCategory.questions[currentCategory.questions.indexOf(currentQuestion) + 1];
  const nextCategory = survey[survey.indexOf(currentCategory) + 1];

  let nextPath = '/resultats';

  if (nextQuestion) {
    nextPath = `/categories/${currentCategory.slug}/questions/${nextQuestion.order}`;
  } else if (nextCategory && nextCategory.questions[0]) {
    nextPath = `/categories/${nextCategory.slug}/questions/${nextCategory.questions[0].order}`;
  }

  const previousQuestion =
    currentCategory.questions[currentCategory.questions.indexOf(currentQuestion) - 1];
  const previousCategory = survey[survey.indexOf(currentCategory) - 1];

  let previousPath = null;

  if (previousQuestion) {
    previousPath = `/categories/${currentCategory.slug}/questions/${previousQuestion.order}`;
  } else if (
    previousCategory &&
    previousCategory.questions[previousCategory.questions.length - 1]
  ) {
    previousPath = `/categories/${previousCategory.slug}/questions/${
      previousCategory.questions[previousCategory.questions.length - 1].order
    }`;
  }

  return {
    props: {
      survey: superjson.stringify(survey),
      politiciansPossibleScores: superjson.stringify(politiciansPossibleScores),
      currentQuestion: superjson.stringify(currentQuestion),
      currentCategory: superjson.stringify(currentCategory),
      previousPath,
      nextPath,
    },
  };
};

const CategoryPage = (serializedProps: SerializedCategoryProps) => {
  const { nextPath, previousPath } = serializedProps;
  const { push } = useRouter();

  const survey = useMemo(
    () => superjson.parse<Survey>(serializedProps.survey),
    [serializedProps.survey],
  );

  const politiciansPossibleScores = useMemo(
    () =>
      superjson.parse<SurveyPoliticiansPossibleScores>(serializedProps.politiciansPossibleScores),
    [serializedProps.politiciansPossibleScores],
  );

  const currentQuestion = useMemo(
    () => superjson.parse<Question>(serializedProps.currentQuestion),
    [serializedProps.currentQuestion],
  );
  const currentCategory = useMemo(
    () => superjson.parse<Category>(serializedProps.currentCategory),
    [serializedProps.currentCategory],
  );

  const { answers, setQuestionAnswer, setPoliticiansPossibleScores } = useSurveyStore();

  const defaultValues = useMemo<QuestionAnswer>(() => {
    const categoryAnswer = answers[currentCategory.id];
    const questionAnswer = categoryAnswer?.[currentQuestion.id];

    return {
      choiceId: questionAnswer?.choiceId ?? null,
      weight: questionAnswer?.weight ?? Importance.NEUTRAL,
    };
  }, [currentQuestion, currentCategory, answers]);

  useEffect(() => {
    console.log('toto');
    setPoliticiansPossibleScores(politiciansPossibleScores);
  }, [politiciansPossibleScores]);

  const onSubmit = useCallback(
    (formValues: QuestionAnswer) => {
      setQuestionAnswer(currentCategory.id, currentQuestion.id, formValues);

      push(nextPath);
    },
    [currentCategory, currentQuestion, nextPath, push, setQuestionAnswer],
  );

  const onChange = useCallback(
    (formValues: QuestionAnswer) => {
      setQuestionAnswer(currentCategory.id, currentQuestion.id, formValues);
    },
    [currentCategory, currentQuestion, setQuestionAnswer],
  );

  const canGoToResult = useMemo(() => {
    return !survey.find(category =>
      category.questions.find(question => !answers[category.id]?.[question.id]?.choiceId),
    );
  }, [answers, survey]);

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
        <AnimatePresence>
          <motion.div
            key={
              currentQuestion.id /* Important so that form gets regenerated between two categories */
            }
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            initial={{ y: 100, opacity: 0, position: 'absolute' }}
            animate={{ y: 0, opacity: 1, position: 'relative' }}
            exit={{ y: -100, opacity: 0, position: 'absolute' }}
            transition={{ duration: 0.3 }}
          >
            <Container maxW="container.md" p={0} m={0}>
              <QuestionForm
                answers={answers}
                currentCategory={currentCategory}
                currentQuestion={currentQuestion}
                onSubmit={onSubmit}
                onChange={onChange}
                previousPath={previousPath}
                nextPath={nextPath}
                canGoToResult={canGoToResult}
              />
            </Container>
          </motion.div>
        </AnimatePresence>
      </SurveyLayout>
    </>
  );
};

export default CategoryPage;
