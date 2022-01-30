import { Politician } from '@prisma/client';
import { SurveyAnswers } from '../types/answers';
import { Survey, SurveyPoliticiansPossibleScores } from '../types/survey';
import { SurveyResult, SurveyResultScore } from '../types/surveyResult';

export const SURVEY_RESULT_SCORE_GAP = 200;

export function calculateSurveyResult(
  survey: Survey,
  answers: SurveyAnswers,
  politiciansPossibleScores: SurveyPoliticiansPossibleScores,
): SurveyResult {
  const rawResult = calculateSurveyScores(survey, answers);
  return normalizeResult(rawResult, politiciansPossibleScores);
}

const normalizeResult = (
  result: SurveyResult,
  politiciansPossibleScores: SurveyPoliticiansPossibleScores,
): SurveyResult => {
  const normalizedScores = result.scores
    .map(({ politicianId, score }) => {
      const politicianBounds = politiciansPossibleScores.politiciansPossibleScores[politicianId];
      const gap = Math.abs(politicianBounds.minPossibleScore) + politicianBounds.maxPossibleScore;
      const factor = SURVEY_RESULT_SCORE_GAP / gap;
      const sub = politicianBounds.maxPossibleScore * factor - 100;
      return {
        politicianId,
        score: Math.round(score * factor - sub),
      };
    })
    .sort((a, b) => a.score - b.score);

  const normalizedCategoriesScores = result.categoriesScores.map(
    ({ categoryId, questionScores, scores }) => {
      return {
        categoryId,
        questionScores,
        scores: scores
          .map(({ politicianId, score }) => {
            const politicianBounds =
              politiciansPossibleScores.categoriesPoliticiansPossibleScores[categoryId][
                politicianId
              ];
            const gap =
              Math.abs(politicianBounds.minPossibleScore) + politicianBounds.maxPossibleScore;
            const factor = SURVEY_RESULT_SCORE_GAP / gap;
            const sub = politicianBounds.maxPossibleScore * factor - 100;
            return {
              politicianId,
              score: Math.round(score * factor - sub),
            };
          })
          .sort((a, b) => a.score - b.score),
      };
    },
  );

  return {
    scores: normalizedScores,
    categoriesScores: normalizedCategoriesScores,
  };
};

const calculateSurveyScores = (survey: Survey, answers: SurveyAnswers): SurveyResult => {
  const categoriesScores = survey.map(({ id: categoryId, questions }) => {
    const questionScores = questions.map(({ id: questionId, choices }) => {
      const answer = answers[categoryId][questionId];
      const selectedChoice = choices.find(choice => choice.id === answer.choiceId);

      if (!selectedChoice) {
        throw `Couldn't find choice ${answer.choiceId}`;
      }

      return {
        questionId,
        choiceId: answer.choiceId,
        scores: selectedChoice.politicianScores.map(({ score, politicianId }) => ({
          politicianId,
          score: score * answer.weight,
        })),
      };
    });

    return {
      categoryId,
      questionScores,
      scores: groupPoliticianScores(questionScores),
    };
  });

  return {
    scores: groupPoliticianScores(categoriesScores),
    categoriesScores,
  };
};

const groupPoliticianScores = (answers: { scores: SurveyResultScore[] }[]): SurveyResultScore[] => {
  const politicianScores = answers.reduce<Record<Politician['id'], number>>(
    (answerAcc, { scores }) => ({
      ...answerAcc,
      ...scores.reduce<Record<Politician['id'], number>>(
        (scoreAcc, { politicianId, score }) => ({
          ...scoreAcc,
          [politicianId]: score + (scoreAcc[politicianId] || 0) + (answerAcc[politicianId] || 0),
        }),
        {},
      ),
    }),
    {},
  );

  return Object.entries(politicianScores).map(([politicianId, score]) => ({
    politicianId,
    score,
  }));
};
