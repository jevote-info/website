import { PrismaClient } from '@prisma/client';
import { ResultDto } from '../types/resultDto';

let prisma: PrismaClient;

export const createResult = async (result: ResultDto): Promise<void> => {
  prisma.result.create({
    data: {
      politicianScores: {
        createMany: {
          data: result.politicianResultScores.map(
            ({ categoriesScores, ...politicianResultScore }) => ({
              categoriesScores: {
                createMany: {
                  data: categoriesScores,
                },
              },
              ...politicianResultScore,
            }),
          ),
        },
      },
    },
  });
};
