import axios from 'axios';
import create, { State, UseBoundStore } from 'zustand';
import createContext from 'zustand/context';
import { persist } from 'zustand/middleware';
import isEqual from 'lodash.isequal';
import { v4 } from 'uuid';
import { QuestionAnswer, SurveyAnswers } from '../types/answers';
import { Category } from '../types/category';
import { Question } from '../types/question';
import { Survey, SurveyPoliticiansPossibleScores } from '../types/survey';
import { SurveyResult } from '../types/surveyResult';
import { calculateSurveyResult } from '../utils/calculateSurveyResult';
import { isQuestionAnswered } from '../utils/isQuestionAnswered';

interface SurveyState extends State {
  uniqueId: string;
  answers: SurveyAnswers;
  result: SurveyResult | null;
  setQuestionAnswer: (
    categoryId: Category['id'],
    questionId: Question['id'],
    answer: QuestionAnswer,
  ) => void;
  calculateResult(survey: Survey, politiciansPossibleScores: SurveyPoliticiansPossibleScores): void;
  saveResult(result: SurveyResult): void;
  findMissingAnswer(survey: Survey): { category: Category; question: Question } | null;
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
          uniqueId: v4(),
          answers: {},
          result: null,
          politiciansPossibleScores: undefined,
          calculateResult(survey, politiciansPossibleScores) {
            const { answers, saveResult } = get();

            const result = calculateSurveyResult(survey, answers, politiciansPossibleScores);

            saveResult(result);

            set({ result });
          },
          setQuestionAnswer(categoryId, questionId, answer) {
            const answers = get().answers;
            const existingAnswer = answers[categoryId]?.[questionId];

            if (isEqual(existingAnswer, answer)) {
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
          findMissingAnswer(survey) {
            const { answers } = get();

            for (const category of survey) {
              for (const question of category.questions) {
                if (!isQuestionAnswered(answers[category.id]?.[question.id])) {
                  return { category, question };
                }
              }
            }

            return null;
          },
          saveResult(result: SurveyResult) {
            const { uniqueId } = get();

            axios.post('api/result', { result, uniqueId });
          },
        }),
        {
          name: 'survey',
          version: 1,
          partialize: state => ({
            uniqueId: state.uniqueId,
            answers: state.answers,
            result: state.result,
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
