import { PrismaClient } from '@prisma/client';
import Survey from '../types/survey';

let prisma: PrismaClient;

export const fetchSurvey = async (options: { previewMode?: boolean } = {}): Promise<Survey> => {
  const { previewMode } = options;

  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma.category.findMany({
    where: previewMode ? undefined : { published: true },
    orderBy: { order: 'asc' },
    include: {
      questions: {
        where: previewMode
          ? undefined
          : {
              published: true,
            },
        orderBy: {
          order: 'asc',
        },
        include: { choices: { include: { politicianScores: true }, orderBy: { order: 'asc' } } },
      },
    },
  });
};
