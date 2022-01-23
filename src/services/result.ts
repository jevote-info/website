import { PrismaClient } from '@prisma/client';
import { ResultDto } from '../types/resultDto';

let prisma: PrismaClient;

export const createResult = async (result: ResultDto): Promise<void> => {
  // do stuff
};
