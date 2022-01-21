import create, { State, UseBoundStore } from 'zustand';
import createContext from 'zustand/context';
import Answer from '../types/answer';

interface SurveyState extends State {
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  addAnswer: (answer: Answer) => void;
}

const { Provider, useStore } = createContext<SurveyState>();

export { Provider as SurveyStoreProvider, useStore as useSurveyStore };

let store: UseBoundStore<SurveyState>;

export const createSurveyStore = () => {
  if (!store || typeof window === 'undefined') {
    store = create<SurveyState>(set => ({
      answers: [],
      setAnswers: (answers: Answer[]) => set(state => ({ ...state, answers })),
      addAnswer: (answer: Answer) =>
        set(state => {
          const alreadyCreatedAnswerIndex = state.answers.findIndex(
            a => a.questionId === answer.questionId,
          );

          if (alreadyCreatedAnswerIndex >= 0) {
            return {
              ...state,
              answers: [
                ...state.answers.slice(0, alreadyCreatedAnswerIndex),
                answer,
                ...state.answers.slice(alreadyCreatedAnswerIndex + 1),
              ],
            };
          } else {
            return { ...state, answers: [...state.answers, answer] };
          }
        }),
    }));
  }

  return store;
};
