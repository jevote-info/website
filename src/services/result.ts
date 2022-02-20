import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { ResultDto } from '../types/resultDto';
import { SurveyResult } from '../types/surveyResult';

let prisma: PrismaClient;

export async function createResult(result: SurveyResult, uniqueId: string): Promise<void> {
  if (!prisma) {
    prisma = new PrismaClient();
  }

  const mappedResult = surveyResultToResultDto(result);

  const resultHash = crypto.createHash('sha256').update(JSON.stringify(mappedResult)).digest('hex');

  const existingResult = await prisma.result.findUnique({
    where: {
      uniqueId_resultHash: {
        uniqueId,
        resultHash
      },
    },
  });
  if (existingResult) return;

  const resultDb = await prisma.result.create({
    data: { uniqueId, resultHash },
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
