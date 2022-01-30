import { SharingVariant } from '../types/surveyResult';

export function isSharingVariant(
  sharingVariant: string | undefined | null,
): sharingVariant is SharingVariant {
  return sharingVariant === 'post' || sharingVariant === 'story';
}
