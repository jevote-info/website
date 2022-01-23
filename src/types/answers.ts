import Category from './category';
import Choice from './choice';
import Question from './question';

export interface QuestionAnswer {
  choiceId: Choice['id'];
  weight: number;
}

export type CategoryAnswers = Record<Question['id'], QuestionAnswer>;

export type SurveyAnswers = Record<Category['id'], CategoryAnswers>;
