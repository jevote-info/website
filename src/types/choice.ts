import { Choice as ChoiceType, PoliticianScore } from '@prisma/client';

type Choice = ChoiceType & {
  politicianScores: PoliticianScore[];
};

export default Choice;
