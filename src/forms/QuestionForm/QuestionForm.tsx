import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Importance } from '../../components/ImportanceMeter';
import QuestionField from '../../components/QuestionField';
import { useIsMobile } from '../../hooks/useIsMobile';
import { QuestionAnswer, SurveyAnswers } from '../../types/answers';
import { Category } from '../../types/category';
import { Question } from '../../types/question';
import { SubmitButtonsDesktop } from './SubmitButtons.desktop';
import { SubmitButtonsMobile } from './SubmitButtons.mobile';

interface CategoryFormProps {
  answers: SurveyAnswers;
  currentCategory: Category;
  currentQuestion: Question;
  onSubmit(values: QuestionAnswer): void;
  onChange(values: QuestionAnswer): void;
  nextPath: string;
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
    nextPath,
    previousPath,
    canGoToResult,
  } = props;

  const isMobile = useIsMobile();

  const defaultValues = useMemo<QuestionAnswer>(() => {
    const categoryAnswer = answers[currentCategory.id];
    const questionAnswer = categoryAnswer?.[currentQuestion.id];

    return {
      choiceId: questionAnswer?.choiceId ?? null,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <QuestionField question={currentQuestion} control={control} />
      {isMobile ? (
        <SubmitButtonsMobile
          previousPath={previousPath}
          currentCategory={currentCategory}
          currentQuestion={currentQuestion}
          categoryAnswers={answers[currentCategory.id]}
          canGoToResult={canGoToResult}
        />
      ) : (
        <SubmitButtonsDesktop
          previousPath={previousPath}
          currentCategory={currentCategory}
          currentQuestion={currentQuestion}
          categoryAnswers={answers[currentCategory.id]}
          canGoToResult={canGoToResult}
        />
      )}
    </form>
  );
}
