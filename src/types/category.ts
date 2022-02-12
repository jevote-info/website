import { Category as CategoryEntity, Choice, PoliticianScore, Question } from '@prisma/client';
import { LightweightQuestion } from './question';

export type Category = CategoryEntity & {
  questions: (Question & {
    choices: (Choice & {
      politicianScores: PoliticianScore[];
    })[];
  })[];
};

export interface LightweightCategory extends Pick<Category, 'id' | 'slug' | 'title' | 'image'> {
  questions: LightweightQuestion[];
}
