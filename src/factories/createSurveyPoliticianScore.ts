import { PoliticianScore } from '@prisma/client';
import faker from '@faker-js/faker';
import RecursivePartial from '../utils/recursivePartial';

export function createSurveyPoliticianScore(
  params: RecursivePartial<PoliticianScore> = {},
): PoliticianScore {
  return {
    id: params.id ?? faker.datatype.uuid(),
    choiceId: params.choiceId ?? faker.datatype.uuid(),
    politicianId: params.politicianId ?? faker.datatype.uuid(),
    score: params.score ?? Math.floor(Math.random() * (2 + 1)) - 1,
    source: params.source ?? faker.internet.url(),
    createdAt: (params.createdAt as Date) ?? faker.date.past(),
    updatedAt: (params.updatedAt as Date) ?? faker.date.past(),
  };
}
