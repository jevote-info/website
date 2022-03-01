import { ReactNode, useEffect, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { LightweightCategory } from '../../types/category';
import { Question } from '../../types/question';
import { LightweightSurvey } from '../../types/survey';
import { SurveyLayoutDesktop } from './SurveyLayout.desktop';
import { SurveyLayoutMobile } from './SurveyLayout.mobile';

interface SurveyLayoutProps {
  survey: LightweightSurvey;
  canGoToResult: boolean;
  currentCategory: LightweightCategory;
  currentQuestion: Question;
  children: ReactNode;
  onGoToResult: () => void;
}

export function SurveyLayout(props: SurveyLayoutProps) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return isMobile ? <SurveyLayoutMobile {...props} /> : <SurveyLayoutDesktop {...props} />;
}
