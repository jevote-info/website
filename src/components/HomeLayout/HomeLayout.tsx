import { ReactNode } from 'react';
import { HomeLayoutDesktop } from './HomeLayout.desktop';
import { HomeLayoutMobile } from './HomeLayout.mobile';
import { useIsMobile } from '../../hooks/useIsMobile';

interface HomeLayoutProps {
  surveyPath: string;
  children: ReactNode;
}

export function HomeLayout(props: HomeLayoutProps) {
  const isMobile = useIsMobile();

  return isMobile ? <HomeLayoutMobile {...props} /> : <HomeLayoutDesktop {...props} />;
}
