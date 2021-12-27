import faker from 'faker';
import { Survey } from '../types/survey';
import { createSurveyQuestion } from './createSurveyQuestion';

type CategoryWithQuestions = Survey[number];

export function createSurveyCategory(
  params: Partial<CategoryWithQuestions> = {},
): CategoryWithQuestions {
  const id = faker.datatype.uuid();
  const title = faker.hacker.verb();

  return {
    id,
    slug: title,
    title,
    description: faker.lorem.sentence(),
    questions: [
      createSurveyQuestion({ categoryId: id, order: 1 }),
      createSurveyQuestion({ categoryId: id, order: 2 }),
      createSurveyQuestion({ categoryId: id, order: 3 }),
    ],
    image: faker.internet.avatar(),
    order: faker.datatype.number(),
    published: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    ...params,
  };
}
