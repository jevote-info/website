import { Politician, PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export const fetchPoliticians = async (): Promise<Politician[]> => {
  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma.politician.findMany();
};
