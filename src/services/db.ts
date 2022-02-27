import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export function getDB(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}
