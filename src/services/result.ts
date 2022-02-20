import { PrismaClient } from '@prisma/client';
import { ResultDto } from '../types/resultDto';
import { SurveyResult } from '../types/surveyResult';

let prisma: PrismaClient;

export async function createResult(result: SurveyResult, uniqueId: string): Promise<void> {
  if (!prisma) {
    prisma = new PrismaClient();
  }

  const mappedResult = surveyResultToResultDto(result);

  await deleteOldResultIfAny(uniqueId);
  const resultDb = await prisma.result.create({
    data: { id: uniqueId },
  });

  await Promise.all(
    mappedResult.politicianResultScores.map(politicianResultScore =>
      prisma.politicianResultScore.create({
        data: {
          ...politicianResultScore,
          resultId: resultDb.id,
          categoriesScores: {
            createMany: {
              data: politicianResultScore.categoriesScores,
            },
          },
        },
        include: {
          categoriesScores: true,
        },
      }),
    ),
  );
}

const surveyResultToResultDto = (result: SurveyResult): ResultDto => {
  return {
    politicianResultScores: result.scores.map(({ politicianId, score }) => ({
      score,
      politicianId,
      categoriesScores: result.categoriesScores.map(({ categoryId, scores: scoresForCategory }) => {
        const politicianCategoryScore = scoresForCategory.find(
          ({ politicianId: categoryPoliticianId }) => categoryPoliticianId === categoryPoliticianId,
        );
        return {
          categoryId,
          score: politicianCategoryScore!.score,
        };
      }),
    })),
  };
};

const deleteOldResultIfAny = async (uniqueId: string): Promise<void> => {
  const existingResult = await prisma.result.findUnique({
    where: {
      id: uniqueId,
    },
  });
  if (!existingResult) return;

  const politicianResultScores = await prisma.politicianResultScore.findMany({
    where: {
      resultId: uniqueId,
    },
  });

  for (const { id: politicianResultScoreId } of politicianResultScores) {
    await prisma.categoryScore.deleteMany({
      where: {
        politicianResultId: politicianResultScoreId,
      },
    });
    await prisma.politicianResultScore.delete({
      where: {
        id: politicianResultScoreId,
      },
    });
  }
  await prisma.result.delete({
    where: {
      id: uniqueId,
    },
  });
};
