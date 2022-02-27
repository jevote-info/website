import faker from '@faker-js/faker';
import { Question } from '../types/question';
import RecursivePartial from '../utils/recursivePartial';
import { createSurveyChoice } from './createSurveyChoice';

export function createSurveyQuestion(params: RecursivePartial<Question> = {}): Question {
  const id = params.id ?? faker.datatype.uuid();

  return {
    id,
    categoryId: params.categoryId ?? faker.datatype.uuid(),
    title: params.title ?? faker.hacker.phrase(),
    description: params.description ?? faker.lorem.sentence(),
    help: params.help ?? faker.random.arrayElement([faker.lorem.sentence(), null]),
    source: params.source ?? faker.internet.url(),
    choices:
      params.choices && params.choices.length
        ? params.choices.map((choice, index) =>
            createSurveyChoice({ questionId: id, ...choice, order: index }),
          )
        : [
            createSurveyChoice({ questionId: id, order: 1 }),
            createSurveyChoice({ questionId: id, order: 2 }),
            createSurveyChoice({ questionId: id, order: 3 }),
          ],
    order: params.order ?? faker.datatype.number(),
    published: params.published ?? faker.datatype.boolean(),
    multichoice: params.multichoice ?? faker.datatype.boolean(),
    createdAt: (params.createdAt as Date) ?? faker.date.past(),
    updatedAt: (params.updatedAt as Date) ?? faker.date.past(),
  };
}
