import { Politician } from '@prisma/client';
import Image from 'next/image';

interface PoliticianPictureProps {
  politician: Politician;
  size?: 'small' | 'medium' | 'big';
}

const sizes = {
  small: { width: 40, height: 30 },
  medium: { width: 60, height: 50 },
  big: { width: 160, height: 120 },
};

export function PoliticianPicture(props: PoliticianPictureProps) {
  const { politician, size = 'medium' } = props;

  return <Image src={politician.pictureUrl} alt={politician.name} {...sizes[size]} />;
}
