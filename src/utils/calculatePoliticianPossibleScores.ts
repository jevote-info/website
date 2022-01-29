import groupBy from 'lodash/groupBy';
import max from 'lodash/max';
import min from 'lodash/min';
import {
  Survey,
  SurveyCategoryPoliticianPossibleScore,
  SurveyPoliticianPossibleScore,
} from '../types/survey';
import { Importance } from '../components/ImportanceMeter';

export const calculatePoliticianFactor = (survey: Survey) => {
  const categoryPossibleScores = survey.map(category => {
    const questionScores = category.questions.map(({ id: questionId, choices }) => {
      const politicianScores = choices.flatMap(({ politicianScores }) =>
        politicianScores.map(({ politicianId, score }) => ({ politicianId, score })),
      );

      return {
        questionId,
        possibleScoresByPolitician: Object.entries(
          groupBy(politicianScores, 'politicianId'),
        ).reduce<SurveyPoliticianPossibleScore>(
          (prev, [politicianId, scores]) => ({
            ...prev,
            [politicianId]: {
              minPossibleScore: min(scores.map(e => e.score * Importance.NOT_IMPORTANT))!,
              maxPossibleScore: max(scores.map(e => e.score * Importance.IMPORTANT))!,
            },
          }),
          {},
        ),
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
    categoryPossibleScores: Object.entries(
      groupBy(categoryPossibleScores, 'categoryId'),
    ).reduce<SurveyCategoryPoliticianPossibleScore>(
      (prev, [categoryId, scores]) => ({
        ...prev,
        [categoryId]: scores[0].possibleScoresByPolitician,
      }),
      {},
    ),
  };
};

const groupPoliticianPossibleScores = (
  possibleScores: { possibleScoresByPolitician: SurveyPoliticianPossibleScore }[],
) =>
  possibleScores
    .flatMap<SurveyPoliticianPossibleScore>(
      ({ possibleScoresByPolitician }) => possibleScoresByPolitician,
    )
    .reduce<SurveyPoliticianPossibleScore>(
      (acc, scores) => ({
        ...acc,
        ...Object.entries(scores).reduce<SurveyPoliticianPossibleScore>(
          (accumulator, [politicianId, politicianScores]) => ({
            ...accumulator,
            [politicianId]: {
              minPossibleScore:
                (acc[politicianId]?.minPossibleScore || 0) + politicianScores.minPossibleScore,
              maxPossibleScore:
                (acc[politicianId]?.maxPossibleScore || 0) + politicianScores.maxPossibleScore,
            },
          }),
          {},
        ),
      }),
      {},
    );
