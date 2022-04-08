import crypto from 'crypto';
import { ResultDto } from '../types/resultDto';
import { SurveyResult } from '../types/surveyResult';
import { getDB } from './db';

export async function createResult(
  result: SurveyResult,
  uniqueId: string
): Promise<void> {
  const db = getDB();

  const mappedResult = surveyResultToResultDto(result);

  const resultHash = crypto
    .createHash('sha256')
    .update(JSON.stringify(mappedResult))
    .digest('hex');

  const existingResult = await db.result.findUnique({
    where: {
      uniqueId_resultHash: {
        uniqueId,
        resultHash,
      },
    },
  });
  if (existingResult) return;

  const [{ politicianId: winnerId }] = result.scores.sort(
    ({ score: a }, { score: b }) => b - a
  );
  const resultDb = await db.result.create({
    data: { uniqueId, resultHash, winnerId },
  });

  for (const politicianResultScore of mappedResult.politicianResultScores) {
    const politicianResultDb = await db.politicianResultScore.create({
      data: {
        score: politicianResultScore.score,
        politicianId: politicianResultScore.politicianId,
        resultId: resultDb.id,
      },
    });
    for (const categoryScore of politicianResultScore.categoriesScores) {
      await db.categoryScore.create({
        data: {
          ...categoryScore,
          politicianResultId: politicianResultDb.id,
        },
      });
    }
  }
}

const surveyResultToResultDto = (result: SurveyResult): ResultDto => {
  return {
    politicianResultScores: result.scores.map(({ politicianId, score }) => ({
      score,
      politicianId,
      categoriesScores: result.categoriesScores.map(
        ({ categoryId, scores: scoresForCategory }) => {
          const politicianCategoryScore = scoresForCategory.find(
            ({ politicianId: categoryPoliticianId }) =>
              categoryPoliticianId === categoryPoliticianId
          );
          return {
            categoryId,
            score: politicianCategoryScore!.score,
          };
        }
      ),
    })),
  };
};
