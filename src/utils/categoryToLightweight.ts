import { Category, LightweightCategory } from '../types/category';
import { questionToLightweight } from './questionToLightweight';

export function categoryToLightweight(category: Category): LightweightCategory {
  const { id, slug, title, image } = category;

  return {
    id,
    slug,
    title,
    image,
    questions: category.questions.map(questionToLightweight),
  };
}
