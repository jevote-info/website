import { Category, Choice, PoliticianScore, Question } from '@prisma/client';

export type Survey = (Category & {
  questions: (Question & {
    choices: (Choice & {
      politicianScores: PoliticianScore[];
    })[];
  })[];
})[];
