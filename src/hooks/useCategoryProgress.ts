import { useMemo } from 'react';
import { CategoryAnswers } from '../types/answers';
import { Category } from '../types/category';

export function useCategoryProgress(category: Category, answers?: CategoryAnswers) {
  const nbAnswers = useMemo(() => {
    return category.questions.reduce(
      (acc, question) => (answers?.[question.id]?.choiceId ? acc + 1 : acc),
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
