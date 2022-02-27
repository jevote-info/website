import { Box } from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import Image from 'next/image';

interface PoliticianPictureProps {
  politician: Politician;
  size?: 'small' | 'medium' | 'big';
}

const sizes = {
  small: { width: '40px', height: '40px' },
  medium: { width: '90px', height: '90px' },
  big: { width: '220px', height: '220px' },
};

export function PoliticianPicture(props: PoliticianPictureProps) {
  const { politician, size = 'medium' } = props;

  return (
    <Box
      borderRadius={size === 'small' ? '8px' : '20px'}
      background="linear-gradient(117.48deg, #4C4FB6 15.73%, #F59F81 98.58%)"
      overflow="hidden"
      {...sizes[size]}
    >
      <Image src={politician.pictureUrl} alt={politician.name} objectFit="cover" {...sizes[size]} />
    </Box>
  );
}
