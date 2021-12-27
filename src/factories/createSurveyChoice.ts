import faker from 'faker';
import { Survey } from '../types/survey';
import { createSurveyPoliticianScore } from './createSurveyPoliticianScore';

type ChoiceWithPoliticianScores = Survey[number]['questions'][number]['choices'][number];

export function createSurveyChoice(
  params: Partial<ChoiceWithPoliticianScores> = {},
): ChoiceWithPoliticianScores {
  const id = faker.datatype.uuid();

  return {
    id,
    questionId: faker.datatype.uuid(),
    text: faker.hacker.phrase(),
    politicianScores: [
      createSurveyPoliticianScore({ choiceId: id }),
      createSurveyPoliticianScore({ choiceId: id }),
      createSurveyPoliticianScore({ choiceId: id }),
    ],
    order: faker.datatype.number(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    ...params,
  };
}
