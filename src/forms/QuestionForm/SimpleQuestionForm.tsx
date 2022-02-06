import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Importance } from '../../components/ImportanceMeter';
import { LightweightCategory } from '../../types/category';
import SimpleQuestionField from '../../components/SimpleQuestionField';
import { SimpleQuestionAnswer, SurveyAnswers } from '../../types/answers';
import { Question } from '../../types/question';

interface CategoryFormProps {
  formId: string;
  answers: SurveyAnswers;
  currentCategory: LightweightCategory;
  currentQuestion: Question;
  onSubmit(values: SimpleQuestionAnswer): void;
  onChange(values: SimpleQuestionAnswer): void;
}

export function QuestionForm(props: CategoryFormProps) {
  const { formId, answers, currentCategory, currentQuestion, onSubmit, onChange } = props;

  const defaultValues = useMemo<SimpleQuestionAnswer>(() => {
    const categoryAnswer = answers[currentCategory.id];
    const questionAnswer = categoryAnswer?.[currentQuestion.id];

    return {
      choiceId: (questionAnswer as SimpleQuestionAnswer)?.choiceId ?? null,
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
      <SimpleQuestionField question={currentQuestion} control={control} />
    </form>
  );
}
