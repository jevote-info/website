import groupBy from 'lodash/groupBy';
import sum from 'lodash/sum';
import Answers from '../types/answers';
import Survey from '../types/survey';
import { SurveyResult, SurveyResultScore } from '../types/surveyResult';

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

    return {
      categoryId: category.id,
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
