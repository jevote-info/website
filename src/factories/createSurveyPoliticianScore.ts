import { PoliticianScore } from '@prisma/client';
import faker from 'faker';

export function createSurveyPoliticianScore(
  params: Partial<PoliticianScore> = {},
): PoliticianScore {
  return {
    id: faker.datatype.uuid(),
    choiceId: faker.datatype.uuid(),
    politicianId: faker.datatype.uuid(),
    score: faker.datatype.number(),
    source: faker.internet.url(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    ...params,
  };
}
