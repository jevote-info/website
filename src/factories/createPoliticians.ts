import { Politician } from '@prisma/client';
import faker from 'faker';

export function createPolitician(params: Partial<Politician> = {}): Politician {
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const slug = name
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');

  return {
    id: faker.datatype.uuid(),
    name,
    slug,
    programUrl: faker.internet.url(),
    pictureUrl: faker.image.imageUrl(),
    bannerUrl: faker.image.imageUrl(),
    politicalParty: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    ...params,
  };
}

// id                     String                  @id @default(uuid())
// createdAt              DateTime                @default(now())
// updatedAt              DateTime                @updatedAt
// slug                   String                  @unique
// name                   String                  @unique
// programUrl             String
// pictureUrl             String
// bannerUrl              String
// politicalParty         String
// description            String
// politicianResultScores PoliticianResultScore[]
// politicianScores       PoliticianScore[]
