import { Survey } from '../types/survey';
import { getDB } from './db';

export const fetchSurvey = async (options: { previewMode?: boolean } = {}): Promise<Survey> => {
  const { previewMode } = options;

  const db = getDB();

  return db.category.findMany({
    where: previewMode ? undefined : { published: true },
    orderBy: { order: 'asc' },
    include: {
      questions: {
        where: previewMode
          ? undefined
          : {
              published: true,
            },
        orderBy: {
          order: 'asc',
        },
        include: { choices: { include: { politicianScores: true }, orderBy: { order: 'asc' } } },
      },
    },
  });
};
