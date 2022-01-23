import groupBy from 'lodash/groupBy';
import sum from 'lodash/sum';
import Answers from '../types/answers';
import { ResultDto } from '../types/resultDto';
import Survey from '../types/survey';

export interface SurveyResultScore {
  politicianId: string;
  score: number;
}

export interface SurveyResult {
  scores: SurveyResultScore[];
  categoriesScores: {
    categoryId: string;
    scores: SurveyResultScore[];
    questionScores: {
      questionId: string;
      choiceId: string;
      scores: SurveyResultScore[];
    }[];
  }[];
}

export function calculateSurveyResult(survey: Survey, answers: Answers): SurveyResult {
  const categoriesScores = survey.map(category => {
    const questionScores = category.questions.map(question => {
      const answer = answers[category.id][question.id];
      const selectedChoice = question.choices.find(choice => choice.id === answer.choiceId);

      if (!selectedChoice) {
        throw `Couldn't find choice ${answer.choiceId}`;
      }

      return {
        questionId: question.id,
        choiceId: answer.choiceId,
        scores: selectedChoice.politicianScores.map(({ score, politicianId }) => ({
          politicianId,
          score: score * answer.weight,
        })),
      };
    });
    const categoryScoreByPolitician = groupBy(
      questionScores.flatMap(({ scores }) => scores),
      'politicianId',
    );

    const scores = Object.entries(categoryScoreByPolitician)
      .map(([politicianId, scores]) => ({
        politicianId,
        score: sum(scores.map(e => e.score)),
      }))
      .sort((a, b) => a.score - b.score);

    return {
      categoryId: category.id,
      questionScores,
      scores,
    };
  });

  const totalScoreByPolitician = groupBy(
    categoriesScores.flatMap(({ scores }) => scores),
    'politicianId',
  );

  const scores = Object.entries(totalScoreByPolitician)
    .map(([politicianId, scores]) => ({
      politicianId,
      score: sum(scores.map(e => e?.score)),
    }))
    .sort((a, b) => a.score - b.score);

  return {
    scores,
    categoriesScores,
  };
}
