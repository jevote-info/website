import { Category, Choice, Politician, PoliticianScore, Question } from '@prisma/client';
import { LightweightCategory } from './category';

export type Survey = (Category & {
  questions: (Question & {
    choices: (Choice & {
      politicianScores: PoliticianScore[];
    })[];
  })[];
})[];

export type LightweightSurvey = LightweightCategory[];

export interface SurveyPoliticiansScoreBounds {
  minPossibleScore: number;
  maxPossibleScore: number;
}

export type SurveyPoliticianPossibleScore = Record<Politician['id'], SurveyPoliticiansScoreBounds>;

export type SurveyCategoryPoliticianPossibleScore = Record<
  Category['id'],
  SurveyPoliticianPossibleScore
>;
export interface SurveyPoliticiansPossibleScores {
  politiciansPossibleScores: SurveyPoliticianPossibleScore;
  categoriesPoliticiansPossibleScores: SurveyCategoryPoliticianPossibleScore;
}
