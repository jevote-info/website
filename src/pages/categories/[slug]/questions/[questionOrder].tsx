import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { useCallback, useMemo, useState } from 'react';
import superjson from 'superjson';
import { SurveyLayout } from '../../../../components/SurveyLayout';
import { QuestionForm } from '../../../../forms/QuestionForm';
import { SubmitButtonsDesktop } from '../../../../forms/QuestionForm/SubmitButtons.desktop';
import { SubmitButtonsMobile } from '../../../../forms/QuestionForm/SubmitButtons.mobile';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { fetchSurvey } from '../../../../services/survey';
import { useSurveyStore } from '../../../../stores/survey';
import { QuestionAnswer } from '../../../../types/answers';
import { LightweightCategory } from '../../../../types/category';
import { Question } from '../../../../types/question';
import { LightweightSurvey } from '../../../../types/survey';
import { categoryToLightweight } from '../../../../utils/categoryToLightweight';
import { isQuestionAnswered } from '../../../../utils/isQuestionAnswered';

interface SerializedCategoryProps {
  survey: LightweightSurvey;
  currentQuestion: string;
  currentCategory: LightweightCategory;
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
      survey: survey.map(categoryToLightweight),
      currentQuestion: superjson.stringify(currentQuestion),
      currentCategory: categoryToLightweight(currentCategory),
      previousPath,
      nextPath,
    },
  };
};

function QuestionPage(serializedProps: SerializedCategoryProps) {
  const { nextPath, previousPath, survey, currentCategory } = serializedProps;
  const { push } = useRouter();
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);

  const currentQuestion = useMemo(
    () => superjson.parse<Question>(serializedProps.currentQuestion),
    [serializedProps.currentQuestion],
  );

  const { answers, setQuestionAnswer } = useSurveyStore();

  const onGoToResult = () => setIsConsentModalOpen(true);

  const onModalClose = () => setIsConsentModalOpen(false);

  const onModalConsent = () => {
    push('/resultats');
  };

  const onSubmit = useCallback(
    (formValues: QuestionAnswer) => {
      setQuestionAnswer(currentCategory.id, currentQuestion.id, formValues);

      if (nextPath !== '/resultats') {
        push(nextPath);
      } else {
        onGoToResult();
      }
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
      category.questions.find(question => {
        const answer = answers[category.id]?.[question.id];

        return !isQuestionAnswered(answer);
      }),
    );
  }, [answers, survey]);

  const isMobile = useIsMobile();

  const formId = 'question-form';

  return (
    <>
      <Head>
        <title>jevote.info - {currentCategory.title}</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
        <link rel="preload" as="image" href="/icons/categories.svg" />
      </Head>
      <Modal isOpen={isConsentModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody marginTop="32px">
            En cliquant sur j&apos;accepte, je consens à ce que les résultats du questionnaire
            soient collectés et conservés à des fins statistiques. Le responsable du traitement est
            JeVote.Info dont les coordonnées sont contact@jevote.info. Les destinataires sont les
            contributeurs du site.
            <br />
            <br />
            Ces données sont anonymes et ne seront en aucun cas utilisées à des fins commerciales.
            <br />
            Seuls les membres de jevote.info auront accès à ces données pour de l&apos;analyse
            dédiée à l&apos;amélioration du site.
            <br />
            <br />
            <NextLink href="/cgu" passHref>
              <Link isExternal fontWeight="bold">
                Conditions générales d&apos;utilisation <ExternalLinkIcon mx="2px" />
              </Link>
            </NextLink>{' '}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="secondary" variant="ghost" mr={3} onClick={onModalClose}>
              Je refuse
            </Button>
            <Button colorScheme="primary" mr={3} onClick={onModalConsent}>
              J&apos;accepte
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SurveyLayout
        survey={survey}
        canGoToResult={canGoToResult}
        currentCategory={currentCategory}
        currentQuestion={currentQuestion}
        onGoToResult={onGoToResult}
      >
        <AnimatePresence>
          <motion.div
            key={
              currentQuestion.id /* Important so that form gets regenerated between two categories */
            }
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            initial={{ y: 100, opacity: 0, position: 'absolute', width: '100%' }}
            animate={{ y: 0, opacity: 1, position: 'relative' }}
            exit={{ y: -100, opacity: 0, position: 'absolute' }}
            transition={{ duration: 0.3 }}
          >
            <QuestionForm
              formId={formId}
              answers={answers}
              currentCategory={currentCategory}
              currentQuestion={currentQuestion}
              onSubmit={onSubmit}
              onChange={onChange}
            />
          </motion.div>
        </AnimatePresence>
        {isMobile ? (
          <SubmitButtonsMobile
            formId="question-form"
            previousPath={previousPath}
            canGoToResult={canGoToResult}
            onGoToResult={onGoToResult}
          />
        ) : (
          <SubmitButtonsDesktop formId={formId} previousPath={previousPath} />
        )}
      </SurveyLayout>
    </>
  );
}

export default QuestionPage;
