import { SharingVariant, ImageSharingVariant } from '../types/surveyResult';

export function isSharingVariant(
  sharingVariant: string | undefined | null,
): sharingVariant is SharingVariant {
  return sharingVariant === 'post' || sharingVariant === 'story';
}

export function isImageSharingVariant(
  sharingVariant: SharingVariant,
): sharingVariant is ImageSharingVariant {
  return sharingVariant !== 'text';
}
