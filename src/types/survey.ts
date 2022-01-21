import { Category, Choice, PoliticianScore, Question } from '@prisma/client';

type Survey = (Category & {
  questions: (Question & {
    choices: (Choice & {
      politicianScores: PoliticianScore[];
    })[];
  })[];
})[];

export default Survey;
