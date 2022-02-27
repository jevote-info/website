import { Politician } from '@prisma/client';
import { getDB } from './db';

export const fetchPoliticians = async (): Promise<Politician[]> => {
  const db = getDB();

  return db.politician.findMany();
};
