import { ReactNode, useEffect, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Category } from '../../types/category';
import { Question } from '../../types/question';
import { Survey } from '../../types/survey';
import { SurveyLayoutDesktop } from './SurveyLayout.desktop';
import { SurveyLayoutMobile } from './SurveyLayout.mobile';

interface SurveyLayoutProps {
  survey: Survey;
  currentCategory: Category;
  currentQuestion: Question;
  children: ReactNode;
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
