import { ReactElement } from 'react';
import { createSurveyStore, SurveyStoreProvider } from './stores/survey';

interface BootstrapStoresProps {
  children: ReactElement;
}

export function BootstrapStores(props: BootstrapStoresProps) {
  const { children } = props;

  return <SurveyStoreProvider createStore={createSurveyStore}>{children}</SurveyStoreProvider>;
}
