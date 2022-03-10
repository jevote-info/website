import { Survey } from '../types/survey';
import { Category } from '../types/category';
import { Question } from '../types/question';
import { Politician } from '@prisma/client';

type PoliticianBoundaries = Record<
  Politician['id'],
  {
    min: number;
    max: number;
  }
>;

export function calculateSurveyBoundaries(survey: Survey) {
  const surveyBoundaries: {
    scores: PoliticianBoundaries;
    categoriesScores: Record<
      Category['id'],
      {
        scores: PoliticianBoundaries;
        questionScores: Record<
          Question['id'],
          {
            scores: PoliticianBoundaries;
          }
        >;
      }
    >;
  } = {
    scores: {},
    categoriesScores: {},
  };

  for (const category of survey) {
    const categoryBoundaries: typeof surveyBoundaries.categoriesScores[string] =
      (surveyBoundaries.categoriesScores[category.id] = {
        scores: {},
        questionScores: {},
      });
    for (const question of category.questions) {
      const questionBoundaries: typeof categoryBoundaries.questionScores[string] =
        (categoryBoundaries.questionScores[question.id] = {
          scores: {},
        });
      for (const choice of question.choices) {
        for (const politicianScore of choice.politicianScores) {
          if (!questionBoundaries.scores[politicianScore.politicianId]) {
            questionBoundaries.scores[politicianScore.politicianId] = {
              min: 0,
              max: 0,
            };
          }
          if (politicianScore.score > 0) {
            if (question.multichoice) {
              questionBoundaries.scores[politicianScore.politicianId] = {
                ...questionBoundaries.scores[politicianScore.politicianId],
                max:
                  (questionBoundaries.scores[politicianScore.politicianId]?.max || 0) +
                  politicianScore.score,
              };
            } else if (
              !questionBoundaries.scores[politicianScore.politicianId]?.max ||
              politicianScore.score > questionBoundaries.scores[politicianScore.politicianId].max
            ) {
              questionBoundaries.scores[politicianScore.politicianId] = {
                ...questionBoundaries.scores[politicianScore.politicianId],
                max: politicianScore.score,
              };
            }
          } else if (politicianScore.score < 0) {
            if (question.multichoice) {
              questionBoundaries.scores[politicianScore.politicianId] = {
                ...questionBoundaries.scores[politicianScore.politicianId],
                min:
                  (questionBoundaries.scores[politicianScore.politicianId]?.min || 0) +
                  politicianScore.score,
              };
            } else if (
              !questionBoundaries.scores[politicianScore.politicianId]?.min ||
              politicianScore.score < questionBoundaries.scores[politicianScore.politicianId].min
            ) {
              questionBoundaries.scores[politicianScore.politicianId] = {
                ...questionBoundaries.scores[politicianScore.politicianId],
                min: politicianScore.score,
              };
            }
          }
        }
      }
      for (const politicianId in questionBoundaries.scores) {
        if (!categoryBoundaries.scores[politicianId]) {
          categoryBoundaries.scores[politicianId] = {
            min: 0,
            max: 0,
          };
        }
        categoryBoundaries.scores[politicianId] = {
          min:
            categoryBoundaries.scores[politicianId].min +
            questionBoundaries.scores[politicianId].min,
          max:
            categoryBoundaries.scores[politicianId].max +
            questionBoundaries.scores[politicianId].max,
        };
      }
    }
    for (const politicianId in categoryBoundaries.scores) {
      if (!surveyBoundaries.scores[politicianId]) {
        surveyBoundaries.scores[politicianId] = {
          min: 0,
          max: 0,
        };
      }
      surveyBoundaries.scores[politicianId] = {
        min:
          surveyBoundaries.scores[politicianId].min + categoryBoundaries.scores[politicianId].min,
        max:
          surveyBoundaries.scores[politicianId].max + categoryBoundaries.scores[politicianId].max,
      };
    }
  }

  return surveyBoundaries;
}
