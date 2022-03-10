import { Category, Choice, PoliticianScore, Question } from '@prisma/client';
import { LightweightCategory } from './category';

export type Survey = (Category & {
  questions: (Question & {
    choices: (Choice & {
      politicianScores: PoliticianScore[];
    })[];
  })[];
})[];

export type LightweightSurvey = LightweightCategory[];
