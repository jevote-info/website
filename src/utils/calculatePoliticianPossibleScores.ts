import groupBy from 'lodash/groupBy';
import sum from 'lodash/sum';
import max from 'lodash/max';
import min from 'lodash/min';
import { Survey, SurveyPoliticiansScoreBounds } from '../types/survey';

export const calculatePoliticianFactor = (survey: Survey) => {
  const categoryPossibleScores = survey.map(category => {
    const questionScores = category.questions.map(({ id: questionId, choices }) => {
      const politicianScores = choices.flatMap(({ politicianScores }) =>
        politicianScores.map(({ politicianId, score }) => ({ politicianId, score })),
      );

      const possibleScoresByPolitician = Object.entries(
        groupBy(politicianScores, 'politicianId'),
      ).map(([politicianId, scores]) => ({
        politicianId,
        minPossibleScore: min(scores.map(e => e.score))!,
        maxPossibleScore: max(scores.map(e => e.score))!,
      }));

      return {
        questionId,
        possibleScoresByPolitician,
      };
    });

    const possibleScoresByPolitician = groupPoliticianPossibleScores(questionScores);

    return {
      categoryId: category.id,
      possibleScoresByPolitician,
    };
  });

  const possibleScoresByPolitician = groupPoliticianPossibleScores(categoryPossibleScores);

  return {
    possibleScoresByPolitician,
    categoryPossibleScores,
  };
};

const groupPoliticianPossibleScores = (
  possibleScores: { possibleScoresByPolitician: SurveyPoliticiansScoreBounds[] }[],
): SurveyPoliticiansScoreBounds[] => {
  const scoresBoundsByPolitician = groupBy(
    possibleScores.flatMap(({ possibleScoresByPolitician }) => possibleScoresByPolitician),
    'politicianId',
  );

  return Object.entries(scoresBoundsByPolitician).map(([politicianId, scores]) => ({
    politicianId,
    minPossibleScore: sum(scores.map(e => e.minPossibleScore)),
    maxPossibleScore: sum(scores.map(e => e.maxPossibleScore)),
  }));
};
