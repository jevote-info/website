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
              ...politicianResultScore,
              categoriesScores: {
                createMany: {
                  data: categoriesScores.map(({ questionAnswers, ...categoryScore }) => ({
                    ...categoryScore,
                    questionAnswers: {
                      createMany: {
                        data: questionAnswers,
                      },
                    },
                  })),
                },
              },
            }),
          ),
        },
      },
    },
  });
};
