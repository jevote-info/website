import { ReactNode } from 'react';
import { createSurveyStore, SurveyStoreProvider } from './stores/survey';

interface BootstrapStoresProps {
  children: ReactNode;
}

export function BootstrapStores(props: BootstrapStoresProps) {
  const { children } = props;

  return <SurveyStoreProvider createStore={createSurveyStore}>{children}</SurveyStoreProvider>;
}
