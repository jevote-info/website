import { Question, LightweightQuestion } from '../types/question';

export function questionToLightweight(question: Question): LightweightQuestion {
  const { id, order } = question;

  return {
    id,
    order,
  };
}
