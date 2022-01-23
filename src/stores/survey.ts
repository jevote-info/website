import { get } from 'lodash';
import create, { State, UseBoundStore } from 'zustand';
import createContext from 'zustand/context';
import Answers from '../types/answers';
import Category from '../types/category';

interface SurveyState extends State {
  answers: Answers;
  setCategoryAnswers: (categoryId: Category['id'], answers: Answers[Category['id']]) => void;
}

const { Provider, useStore } = createContext<SurveyState>();

export { Provider as SurveyStoreProvider, useStore as useSurveyStore };

let store: UseBoundStore<SurveyState>;

export const createSurveyStore = () => {
  if (!store || typeof window === 'undefined') {
    store = create<SurveyState>((set, get) => ({
      answers: {},
      setCategoryAnswers(categoryId, answers) {
        set({ answers: { ...get().answers, [categoryId]: answers } });
      },
    }));
  }

  return store;
};
