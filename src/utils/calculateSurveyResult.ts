import { Politician } from '@prisma/client';
import { MultichoiceQuestionAnswer, SimpleQuestionAnswer, SurveyAnswers } from '../types/answers';
import { Survey } from '../types/survey';
import { SurveyResult } from '../types/surveyResult';
import { calculateSurveyBoundaries } from './calculateSurveyBoundaries';
import { Question } from '../types/question';
import { Category } from '../types/category';

export function calculateSurveyResult(survey: Survey, answers: SurveyAnswers): SurveyResult {
  const surveyBoundaries = calculateSurveyBoundaries(survey);

  const surveyResult: {
    scores: Record<Politician['id'], number>;
    categoriesScores: Record<
      Category['id'],
      {
        scores: Record<Politician['id'], number>;
        questionScores: Record<
          Question['id'],
          {
            scores: Record<Politician['id'], number>;
          }
        >;
      }
    >;
  } = {
    scores: {},
    categoriesScores: {},
  };

  for (const category of survey) {
    const categoryResult: typeof surveyResult.categoriesScores[string] =
      (surveyResult.categoriesScores[category.id] = {
        scores: {},
        questionScores: {},
      });
    for (const question of category.questions) {
      const questionResult: typeof categoryResult.questionScores[number] =
        (categoryResult.questionScores[question.id] = {
          scores: {},
        });
      if (question.multichoice) {
        const { weight, choices } = answers[category.id][question.id] as MultichoiceQuestionAnswer;

        for (const choiceId of choices) {
          const choice = question.choices.find(({ id }) => id === choiceId);
          if (choice) {
            for (const politicianScore of choice.politicianScores) {
              questionResult.scores[politicianScore.politicianId] =
                (questionResult.scores[politicianScore.politicianId] || 0) +
                politicianScore.score * weight;
            }
          }
        }
      } else {
        const { weight, choiceId } = answers[category.id][question.id] as SimpleQuestionAnswer;

        const choice = question.choices.find(({ id }) => id === choiceId);
        if (choice) {
          for (const politicianScore of choice.politicianScores) {
            questionResult.scores[politicianScore.politicianId] =
              (questionResult.scores[politicianScore.politicianId] || 0) +
              politicianScore.score * weight;
          }
        }
      }
      for (const politicianId in questionResult.scores) {
        categoryResult.scores[politicianId] =
          (categoryResult.scores[politicianId] || 0) + questionResult.scores[politicianId];
      }
    }
    for (const politicianId in categoryResult.scores) {
      surveyResult.scores[politicianId] =
        (surveyResult.scores[politicianId] || 0) + categoryResult.scores[politicianId];
    }
  }

  let maxOverflow: number | null = null;
  let minOverflow: number | null = null;

  for (const politicianId in surveyResult.scores) {
    if (surveyResult.scores[politicianId] > 0 && surveyBoundaries.scores[politicianId]?.max) {
      surveyResult.scores[politicianId] =
        (surveyResult.scores[politicianId] * 100) / surveyBoundaries.scores[politicianId].max;

      if (
        surveyResult.scores[politicianId] > 100 &&
        (maxOverflow === null || surveyResult.scores[politicianId] > maxOverflow)
      ) {
        maxOverflow = surveyResult.scores[politicianId];
      }
    } else if (
      surveyResult.scores[politicianId] < 0 &&
      surveyBoundaries.scores[politicianId]?.min
    ) {
      surveyResult.scores[politicianId] =
        (surveyResult.scores[politicianId] * -100) / surveyBoundaries.scores[politicianId].min;

      if (
        surveyResult.scores[politicianId] < -100 &&
        (minOverflow === null || surveyResult.scores[politicianId] < minOverflow)
      ) {
        minOverflow = surveyResult.scores[politicianId];
      }
    }
  }

  if (maxOverflow) {
    for (const politicianId in surveyResult.scores) {
      if (surveyResult.scores[politicianId] > 0) {
        surveyResult.scores[politicianId] *= 100 / maxOverflow;
      }
    }
  }

  if (minOverflow) {
    for (const politicianId in surveyResult.scores) {
      if (surveyResult.scores[politicianId] < 0) {
        surveyResult.scores[politicianId] *= -100 / minOverflow;
      }
    }
  }

  for (const categoryId in surveyResult.categoriesScores) {
    const categoryScores = surveyResult.categoriesScores[categoryId].scores;
    const categoryBoundaries = surveyBoundaries.categoriesScores[categoryId].scores;

    let maxOverflow: number | null = null;
    let minOverflow: number | null = null;

    for (const politicianId in categoryScores) {
      if (categoryScores[politicianId] > 0 && categoryBoundaries[politicianId]?.max) {
        categoryScores[politicianId] =
          (categoryScores[politicianId] * 100) / categoryBoundaries[politicianId].max;

        if (
          categoryScores[politicianId] > 100 &&
          (maxOverflow === null || categoryScores[politicianId] > maxOverflow)
        ) {
          maxOverflow = categoryScores[politicianId];
        }
      } else if (categoryScores[politicianId] < 0 && categoryBoundaries[politicianId]?.min) {
        categoryScores[politicianId] =
          (categoryScores[politicianId] * -100) / categoryBoundaries[politicianId].min;

        if (
          categoryScores[politicianId] < -100 &&
          (minOverflow === null || categoryScores[politicianId] < minOverflow)
        ) {
          minOverflow = categoryScores[politicianId];
        }
      }
    }

    if (maxOverflow) {
      for (const politicianId in surveyResult.scores) {
        if (categoryScores[politicianId] > 0) {
          categoryScores[politicianId] *= 100 / maxOverflow;
        }
      }
    }

    if (minOverflow) {
      for (const politicianId in surveyResult.scores) {
        if (categoryScores[politicianId] < 0) {
          categoryScores[politicianId] *= -100 / minOverflow;
        }
      }
    }
  }

  return {
    scores: Object.entries(surveyResult.scores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([politicianId, score]) => ({
        politicianId,
        score: Math.floor(score),
      })),
    categoriesScores: Object.entries(surveyResult.categoriesScores).map(
      ([categoryId, { scores, questionScores }]) => ({
        categoryId,
        scores: Object.entries(scores)
          .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
          .map(([politicianId, score]) => ({
            politicianId,
            score: Math.floor(score),
          })),
        questionScores: Object.entries(questionScores).map(([questionId, { scores }]) => ({
          questionId,
          scores: Object.entries(scores)
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
            .map(([politicianId, score]) => ({
              politicianId,
              score: Math.floor(score),
            })),
        })),
      }),
    ),
  };
}
