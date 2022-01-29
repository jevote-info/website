import { Survey, SurveyPoliticianPossibleScore } from '../types/survey';

export const calculatePoliticianFactor = (survey: Survey) => {
  const categoryPossibleScoresByPolitician = survey.map(category => {
    const questionScores = category.questions.map(({ id: questionId, choices }) => {
      const politicianScores = choices.flatMap(({ politicianScores }) =>
        politicianScores.map(({ politicianId, score }) => ({ politicianId, score })),
      );

      const possibleScoresByPolitician = politicianScores.reduce<SurveyPoliticianPossibleScore>(
        (acc, { politicianId, score }) => ({
          ...acc,
          [politicianId]: acc[politicianId]
            ? {
                minPossibleScore:
                  score < acc[politicianId].minPossibleScore
                    ? score
                    : acc[politicianId].minPossibleScore,
                maxPossibleScore:
                  score < acc[politicianId].maxPossibleScore
                    ? score
                    : acc[politicianId].maxPossibleScore,
              }
            : {
                minPossibleScore: score,
                maxPossibleScore: score,
              },
        }),
        {},
      );

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

  const possibleScoresByPolitician = groupPoliticianPossibleScores(
    categoryPossibleScoresByPolitician,
  );

  const categoryPossibleScores = categoryPossibleScoresByPolitician.reduce(
    (acc, { categoryId, possibleScoresByPolitician }) => ({
      ...acc,
      [categoryId]: possibleScoresByPolitician,
    }),
    {},
  );

  return {
    possibleScoresByPolitician,
    categoryPossibleScores,
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
