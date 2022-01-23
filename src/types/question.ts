import { Choice, PoliticianScore, Question as QuestionType } from '@prisma/client';

type Question = QuestionType & {
  choices: (Choice & {
    politicianScores: PoliticianScore[];
  })[];
};

export default Question;
