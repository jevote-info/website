import { Category, Choice, PoliticianScore, Question } from '@prisma/client';

export type Survey = (Category & {
  questions: (Question & {
    choices: (Choice & {
      politicianScores: PoliticianScore[];
    })[];
  })[];
})[];

export interface SurveyPoliticiansScoreBounds {
  politicianId: string;
  minPossibleScore: number;
  maxPossibleScore: number;
}
export interface SurveyPoliticiansPossibleScores {
  politiciansPossibleScores: SurveyPoliticiansScoreBounds[];
  categoriesPoliticiansPossibleScores: {
    categoryId: string;
    politiciansPossibleScores: SurveyPoliticiansScoreBounds[];
  };
}
