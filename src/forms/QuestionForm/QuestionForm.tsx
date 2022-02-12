import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Importance } from '../../components/ImportanceMeter';
import QuestionField from '../../components/QuestionField';
import { QuestionAnswer, SurveyAnswers } from '../../types/answers';
import { LightweightCategory } from '../../types/category';
import { Question } from '../../types/question';

interface CategoryFormProps {
  formId: string;
  answers: SurveyAnswers;
  currentCategory: LightweightCategory;
  currentQuestion: Question;
  onSubmit(values: QuestionAnswer): void;
  onChange(values: QuestionAnswer): void;
}

export function QuestionForm(props: CategoryFormProps) {
  const { formId, answers, currentCategory, currentQuestion, onSubmit, onChange } = props;

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
    <form id={formId} style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <QuestionField question={currentQuestion} control={control} />
    </form>
  );
}
