import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Importance } from '../../components/ImportanceMeter';
import MultichoiceQuestionField from '../../components/MultichoiceQuestionField';
import { useIsMobile } from '../../hooks/useIsMobile';
import { MultichoiceQuestionAnswer, SurveyAnswers } from '../../types/answers';
import { Category } from '../../types/category';
import { Question } from '../../types/question';
import { SubmitButtonsDesktop } from './SubmitButtons.desktop';
import { SubmitButtonsMobile } from './SubmitButtons.mobile';

interface CategoryFormProps {
  answers: SurveyAnswers;
  currentCategory: Category;
  currentQuestion: Question;
  onSubmit(values: MultichoiceQuestionAnswer): void;
  onChange(values: MultichoiceQuestionAnswer): void;
  previousPath: string | null;
  canGoToResult: boolean;
}

export function QuestionForm(props: CategoryFormProps) {
  const {
    answers,
    currentCategory,
    currentQuestion,
    onSubmit,
    onChange,
    previousPath,
    canGoToResult,
  } = props;

  const isMobile = useIsMobile();

  const defaultValues = useMemo<MultichoiceQuestionAnswer>(() => {
    const categoryAnswer = answers[currentCategory.id];
    const questionAnswer = categoryAnswer?.[currentQuestion.id];

    return {
      choices: (questionAnswer as MultichoiceQuestionAnswer)?.choices ?? null,
      weight: questionAnswer?.weight ?? Importance.NEUTRAL,
    };
  }, [currentQuestion, currentCategory, answers]);

  const { control, handleSubmit, watch } = useForm({
    defaultValues,
  });

  const answer = watch();
  useEffect(() => {
    onChange(answer);
  }, [onChange, answer]);

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <MultichoiceQuestionField question={currentQuestion} control={control} />
      {isMobile ? (
        <SubmitButtonsMobile previousPath={previousPath} canGoToResult={canGoToResult} />
      ) : (
        <SubmitButtonsDesktop previousPath={previousPath} canGoToResult={canGoToResult} />
      )}
    </form>
  );
}
