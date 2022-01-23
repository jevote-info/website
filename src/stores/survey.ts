import create, { State, UseBoundStore } from 'zustand';
import createContext from 'zustand/context';
import { persist } from 'zustand/middleware';
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

const { Provider, useStore, useStoreApi } = createContext<SurveyState>();

export {
  Provider as SurveyStoreProvider,
  useStore as useSurveyStore,
  useStoreApi as useSurveyStoreApi,
};

let store: UseBoundStore<SurveyState>;

export const createSurveyStore = () => {
  if (!store || typeof window === 'undefined') {
    store = create<SurveyState>(
      persist(
        (set, get) => ({
          answers: {},
          setQuestionAnswer(categoryId, questionId, answer) {
            const answers = get().answers;
            const existingAnswer = answers[categoryId]?.[questionId];

            if (
              existingAnswer?.choiceId === answer.choiceId &&
              existingAnswer?.weight === answer.weight
            ) {
              return;
            }

            set({
              answers: {
                ...answers,
                [categoryId]: {
                  ...answers[categoryId],
                  [questionId]: answer,
                },
              },
            });
          },
        }),
        {
          name: 'survey',
          partialize: state => ({
            answers: state.answers,
          }),
          getStorage: () =>
            typeof window === 'undefined'
              ? {
                  getItem() {
                    return '';
                  },
                  setItem() {
                    /**/
                  },
                  removeItem() {
                    /**/
                  },
                }
              : localStorage,
        },
      ),
    );
  }

  return store;
};
