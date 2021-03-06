import faker from '@faker-js/faker';
import { Category } from '../types/category';
import RecursivePartial from '../utils/recursivePartial';
import { createSurveyQuestion } from './createSurveyQuestion';

export function createSurveyCategory(params: RecursivePartial<Category> = {}): Category {
  const id = params.id ?? faker.datatype.uuid();
  const title = params.title ?? faker.hacker.verb();

  return {
    id,
    slug: params.slug ?? title,
    title,
    questions:
      params.questions && params.questions.length
        ? params.questions.map((question, index) =>
            createSurveyQuestion({ categoryId: id, published: true, ...question, order: index }),
          )
        : [
            createSurveyQuestion({ categoryId: id, published: true, order: 1 }),
            createSurveyQuestion({ categoryId: id, published: true, order: 2 }),
            createSurveyQuestion({ categoryId: id, published: true, order: 3 }),
          ],
    image: params.image ?? faker.internet.avatar(),
    order: params.order ?? faker.datatype.number(),
    published: params.published ?? faker.datatype.boolean(),
    createdAt: (params.createdAt as Date) ?? faker.date.past(),
    updatedAt: (params.updatedAt as Date) ?? faker.date.past(),
  };
}
