import groupBy from 'lodash/groupBy';
import sum from 'lodash/sum';
import max from 'lodash/max';
import min from 'lodash/min';
import Answers from '../types/answers';
import Survey from '../types/survey';
import { SurveyResult, SurveyResultScore } from '../types/surveyResult';

export function calculateSurveyResult(survey: Survey, answers: Answers): SurveyResult {
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
}

const groupPoliticianScores = (answers: { scores: SurveyResultScore[] }[]): SurveyResultScore[] => {
  const scoresByPolitician = groupBy(
    answers.flatMap(({ scores }) => scores),
    'politicianId',
  );

  return Object.entries(scoresByPolitician)
    .map(([politicianId, scores]) => ({
      politicianId,
      score: sum(scores.map(e => e?.score)),
    }))
    .sort((a, b) => a.score - b.score);
};

const calculatePoliticianFactor = (survey: Survey) => {
  survey.map(category => {
    const questionScores = category.questions.map(({ id: questionId, choices }) => {
      const politicianScores = choices.flatMap(({ politicianScores }) =>
        politicianScores.map(({ politicianId, score }) => ({ politicianId, score })),
      );

      const possibleScoresByPolitician = Object.entries(
        groupBy(politicianScores, 'politicianId'),
      ).map(([politicianId, scores]) => ({
        politicianId,
        minPossibleScore: min(scores.map(e => e.score)),
        maxPossibleScore: max(scores.map(e => e.score)),
      }));

      return {
        questionId,
        possibleScoresByPolitician,
      };
    });

    const possibleScoresByPolitician = Object.entries(
      groupBy(politicianScores, 'politicianId'),
    ).map(([politicianId, scores]) => ({
      politicianId,
      minPossibleScore: min(scores.map(e => e.score)),
      maxPossibleScore: max(scores.map(e => e.score)),
    }));

    return {
      categoryId: category.id,
      questionScores,
      scores: groupPoliticianScores(questionScores),
    };
  });
};
