import { Choice, PoliticianScore, Question as QuestionType } from '@prisma/client';

export type Question = QuestionType & {
  choices: (Choice & {
    politicianScores: PoliticianScore[];
  })[];
};
