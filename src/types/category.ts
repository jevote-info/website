import { Category as CategoryType, Choice, PoliticianScore, Question } from '@prisma/client';

export type Category = CategoryType & {
  questions: (Question & {
    choices: (Choice & {
      politicianScores: PoliticianScore[];
    })[];
  })[];
};
