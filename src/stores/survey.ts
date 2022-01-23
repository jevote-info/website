import create, { State, UseBoundStore } from 'zustand';
import createContext from 'zustand/context';
import { QuestionAnswer, SurveyAnswers } from '../types/answers';
import Category from '../types/category';
import Question from '../types/question';

interface SurveyState extends State {
  answers: SurveyAnswers;
  setQuestionAnswer: (
    categoryId: Category['id'],
    questionId: Question['id'],
    answer: QuestionAnswer,
  ) => void;
}

const { Provider, useStore } = createContext<SurveyState>();

export { Provider as SurveyStoreProvider, useStore as useSurveyStore };

let store: UseBoundStore<SurveyState>;

export const createSurveyStore = () => {
  if (!store || typeof window === 'undefined') {
    store = create<SurveyState>((set, get) => ({
      answers: {},
      setQuestionAnswer(categoryId, questionId, answer) {
        set({
          answers: {
            ...get().answers,
            [categoryId]: {
              ...get().answers[categoryId],
              [questionId]: answer,
            },
          },
        });
      },
    }));
  }

  return store;
};
