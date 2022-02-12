import { useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import darkLogo from './logo-dark.png';
import lightLogo from './logo-light.png';

interface LogoProps {
  size?: 'medium' | 'small';
}

const sizes = {
  medium: { width: 128, height: 40 },
  small: { width: 64, height: 20 },
};

export function Logo(props: LogoProps) {
  const { size = 'medium' } = props;

  const logo = useColorModeValue(darkLogo, lightLogo);

  return <Image src={logo} alt="logo" width={sizes[size].width} height={sizes[size].height} />;
}
