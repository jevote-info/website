import { ReactNode } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { HomeLayoutDesktop } from './HomeLayout.desktop';
import { HomeLayoutMobile } from './HomeLayout.mobile';

interface HomeLayoutProps {
  surveyPath: string;
  children: ReactNode;
}

export function HomeLayout(props: HomeLayoutProps) {
  const variant = useBreakpointValue({ base: 'mobile', lg: 'desktop' });

  return variant === 'desktop' ? <HomeLayoutDesktop {...props} /> : <HomeLayoutMobile {...props} />;
}
