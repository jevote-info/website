import { Category as CategoryType, Choice, PoliticianScore, Question } from '@prisma/client';

type Category = CategoryType & {
  questions: (Question & {
    choices: (Choice & {
      politicianScores: PoliticianScore[];
    })[];
  })[];
};

export default Category;
