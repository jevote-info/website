import { useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Survey from '../../types/survey';
import { SurveyLayoutDesktop } from './SurveyLayout.desktop';
import { SurveyLayoutMobile } from './SurveyLayout.mobile';

interface SurveyLayoutProps {
  survey: Survey;
  currentCategory: Survey[number];
  children: ReactNode;
}

export function SurveyLayout(props: SurveyLayoutProps) {
  const variant = useBreakpointValue({ base: 'mobile', lg: 'desktop' });

  return variant === 'desktop' ? (
    <SurveyLayoutDesktop {...props} />
  ) : (
    <SurveyLayoutMobile {...props} />
  );
}
