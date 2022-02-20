import { Politician } from '@prisma/client';
import { MultichoiceQuestionAnswer, SimpleQuestionAnswer, SurveyAnswers } from '../types/answers';
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
    .sort((a, b) => b.score - a.score);

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
          .sort((a, b) => b.score - a.score),
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
    const questionScores = questions.map(({ id: questionId, choices, multichoice }) => {
      const answer = answers[categoryId][questionId];
      if (isMultichoiceQuestionAnswer(answer, multichoice)) {
        const selectedChoices = [];
        for (const choiceId of answer.choices) {
          const c = choices.find(choice => choice.id === choiceId);
          if (c) {
            selectedChoices.push(c);
          } else {
            throw `Couldn't find choice ${choiceId}`;
          }
        }

        const scores = selectedChoices.reduce<SurveyResultScore[]>((acc, { politicianScores }) => {
          return politicianScores.map(({ score, politicianId }) => {
            const previousScore =
              acc.find(({ politicianId: accPoliticianId }) => politicianId === accPoliticianId)
                ?.score || 0;
            return {
              politicianId,
              score: score * answer.weight + previousScore,
            };
          });
        }, []);

        return {
          questionId,
          scores,
        };
      } else {
        const selectedChoice = choices.find(choice => choice.id === answer.choiceId);

        if (!selectedChoice) {
          throw `Couldn't find choice ${answer.choiceId}`;
        }

        return {
          questionId,
          scores: selectedChoice.politicianScores.map(({ score, politicianId }) => ({
            politicianId,
            score: score * answer.weight,
          })),
        };
      }
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

const isMultichoiceQuestionAnswer = (
  answer: MultichoiceQuestionAnswer | SimpleQuestionAnswer,
  multichoice: boolean,
): answer is MultichoiceQuestionAnswer => {
  return multichoice;
};
