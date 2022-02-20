import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Importance } from '../../components/ImportanceMeter';
import { MultichoiceQuestionField } from '../../components/MultichoiceQuestionField';
import { MultichoiceQuestionAnswer, SurveyAnswers } from '../../types/answers';
import { LightweightCategory } from '../../types/category';
import { Question } from '../../types/question';

interface CategoryFormProps {
  formId: string;
  answers: SurveyAnswers;
  currentCategory: LightweightCategory;
  currentQuestion: Question;
  onSubmit(values: MultichoiceQuestionAnswer): void;
  onChange(values: MultichoiceQuestionAnswer): void;
}

export function MultichoiceQuestionForm(props: CategoryFormProps) {
  const { formId, answers, currentCategory, currentQuestion, onSubmit, onChange } = props;

  const defaultValues = useMemo<MultichoiceQuestionAnswer>(() => {
    const categoryAnswer = answers[currentCategory.id];
    const questionAnswer = categoryAnswer?.[currentQuestion.id];

    return {
      choices: (questionAnswer as MultichoiceQuestionAnswer)?.choices ?? [],
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
      <MultichoiceQuestionField question={currentQuestion} control={control} />
    </form>
  );
}
