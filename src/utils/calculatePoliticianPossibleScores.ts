import {
  Survey,
  SurveyPoliticianPossibleScore,
  SurveyPoliticiansPossibleScores,
} from '../types/survey';

export const calculatePoliticianFactor = (survey: Survey): SurveyPoliticiansPossibleScores => {
  const categoryPossibleScoresByPolitician = survey.map(category => {
    const questionScores = category.questions.map(({ id: questionId, choices, multichoice }) => {
      const politicianScores = choices.flatMap(({ politicianScores }) =>
        politicianScores.map(({ politicianId, score }) => ({ politicianId, score })),
      );

      const possibleScoresByPolitician = multichoice
        ? politicianScores.reduce<SurveyPoliticianPossibleScore>(
            (acc, { politicianId, score }) => ({
              ...acc,
              [politicianId]: acc[politicianId]
                ? {
                    minPossibleScore:
                      score < 0
                        ? acc[politicianId].minPossibleScore + score
                        : acc[politicianId].minPossibleScore,
                    maxPossibleScore:
                      score > 0
                        ? acc[politicianId].maxPossibleScore + score
                        : acc[politicianId].maxPossibleScore,
                  }
                : {
                    minPossibleScore: score,
                    maxPossibleScore: score,
                  },
            }),
            {},
          )
        : politicianScores.reduce<SurveyPoliticianPossibleScore>(
            (acc, { politicianId, score }) => ({
              ...acc,
              [politicianId]: acc[politicianId]
                ? {
                    minPossibleScore:
                      score <= acc[politicianId].minPossibleScore
                        ? score
                        : acc[politicianId].minPossibleScore,
                    maxPossibleScore:
                      score >= acc[politicianId].maxPossibleScore
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

  const politiciansPossibleScores = groupPoliticianPossibleScores(
    categoryPossibleScoresByPolitician,
  );

  const categoriesPoliticiansPossibleScores = categoryPossibleScoresByPolitician.reduce(
    (acc, { categoryId, possibleScoresByPolitician }) => ({
      ...acc,
      [categoryId]: possibleScoresByPolitician,
    }),
    {},
  );

  return {
    politiciansPossibleScores,
    categoriesPoliticiansPossibleScores,
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
