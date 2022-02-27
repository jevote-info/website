import { Politician } from '@prisma/client';
import Image from 'next/image';

interface PoliticianPictureProps {
  politician: Politician;
  size?: 'small' | 'medium' | 'big';
}

const sizes = {
  small: { width: 40, height: 40 },
  medium: { width: 90, height: 90 },
  big: { width: 220, height: 220 },
};

export function PoliticianPicture(props: PoliticianPictureProps) {
  const { politician, size = 'medium' } = props;

  return <Image src={politician.pictureUrl} alt={politician.name} {...sizes[size]} />;
}
