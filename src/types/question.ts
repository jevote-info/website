import { Choice, PoliticianScore, Question as QuestionEntity } from '@prisma/client';

export type Question = QuestionEntity & {
  choices: (Choice & {
    politicianScores: PoliticianScore[];
  })[];
};

export type LightweightQuestion = Pick<Question, 'id' | 'order'>;
