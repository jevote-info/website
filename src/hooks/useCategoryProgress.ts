import { useMemo } from 'react';
import { CategoryAnswers } from '../types/answers';
import { LightweightCategory } from '../types/category';
import { isQuestionAnswered } from '../utils/isQuestionAnswered';

export function useCategoryProgress(category: LightweightCategory, answers?: CategoryAnswers) {
  const nbAnswers = useMemo(() => {
    return category.questions.reduce(
      (acc, question) => (isQuestionAnswered(answers?.[question.id]) ? acc + 1 : acc),
      0,
    );
  }, [category, answers]);

  const progress = (nbAnswers * 100) / category.questions.length;
  const isComplete = progress === 100;

  return {
    nbAnswers,
    progress,
    isComplete,
  };
}
