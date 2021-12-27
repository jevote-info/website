import faker from 'faker';
import { Survey } from '../types/survey';
import { createSurveyChoice } from './createSurveyChoice';

type QuestionWithChoices = Survey[number]['questions'][number];

export function createSurveyQuestion(
  params: Partial<QuestionWithChoices> = {},
): QuestionWithChoices {
  const id = faker.datatype.uuid();

  return {
    id,
    categoryId: faker.datatype.uuid(),
    title: faker.hacker.phrase(),
    description: faker.lorem.sentence(),
    help: faker.random.arrayElement([faker.lorem.sentence(), null]),
    choices: [
      createSurveyChoice({ questionId: id, order: 1 }),
      createSurveyChoice({ questionId: id, order: 2 }),
      createSurveyChoice({ questionId: id, order: 3 }),
    ],
    order: faker.datatype.number(),
    published: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    ...params,
  };
}
