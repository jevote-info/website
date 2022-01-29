import faker from 'faker';
import Choice from '../types/choice';
import RecursivePartial from '../utils/recursivePartial';
import { createSurveyPoliticianScore } from './createSurveyPoliticianScore';

export function createSurveyChoice(params: RecursivePartial<Choice> = {}): Choice {
  const id = params.id ?? faker.datatype.uuid();

  return {
    id,
    questionId: params.questionId ?? faker.datatype.uuid(),
    text: params.text ?? faker.hacker.phrase(),
    politicianScores:
      params.politicianScores && params.politicianScores.length
        ? params.politicianScores.map(politicianScore =>
            createSurveyPoliticianScore({ choiceId: id, ...politicianScore }),
          )
        : [
            createSurveyPoliticianScore({ choiceId: id }),
            createSurveyPoliticianScore({ choiceId: id }),
            createSurveyPoliticianScore({ choiceId: id }),
          ],
    order: params.order ?? faker.datatype.number(),
    createdAt: (params.createdAt as Date) && faker.date.past(),
    updatedAt: (params.updatedAt as Date) && faker.date.past(),
  };
}
