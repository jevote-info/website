import create, { State, UseBoundStore } from 'zustand';
import createContext from 'zustand/context';

interface SurveyState extends State {
  // TODO should only contain answers and result because questions are loaded statically
  bears: number;
  increasePopulation(): void;
  removeAllBears(): void;
}

const { Provider, useStore } = createContext<SurveyState>();

export { Provider as SurveyStoreProvider, useStore as useSurveyStore };

let store: UseBoundStore<SurveyState>;

export const createSurveyStore = () => {
  if (!store || typeof window === 'undefined') {
    store = create<SurveyState>(set => ({
      bears: 0,
      increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }));
  }

  return store;
};
