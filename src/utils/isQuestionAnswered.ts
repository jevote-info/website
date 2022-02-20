import { isSimpleQuestionAnswer, QuestionAnswer } from '../types/answers';

export function isQuestionAnswered(answer?: QuestionAnswer) {
  if (!answer) {
    return false;
  }

  return isSimpleQuestionAnswer(answer) ? !!answer?.choiceId : !!answer.choices?.length;
}
