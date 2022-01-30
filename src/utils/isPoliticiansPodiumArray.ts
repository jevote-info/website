import { Politician } from '@prisma/client';

export function isPoliticiansPodiumArray(politicians: unknown): politicians is Politician[] {
  if (!politicians || !Array.isArray(politicians) || politicians.length != 3) {
    return false;
  }
  for (const politician of politicians) {
    if (typeof politician !== 'object' || !politician.name) {
      return false;
    }
  }
  return true;
}
