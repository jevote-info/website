import { Category } from './category';
import Choice from './choice';
import { Question } from './question';

export interface SimpleQuestionAnswer {
  choiceId: Choice['id'];
  weight: number;
}
export interface MultichoiceQuestionAnswer {
  choices: Choice['id'][];
  weight: number;
}

export type QuestionAnswer = SimpleQuestionAnswer | MultichoiceQuestionAnswer;

export type CategoryAnswers = Record<Question['id'], QuestionAnswer>;

export type SurveyAnswers = Record<Category['id'], CategoryAnswers>;

export function isSimpleQuestionAnswer(
  questionAnswer: QuestionAnswer,
): questionAnswer is SimpleQuestionAnswer {
  return 'choiceId' in questionAnswer;
}
