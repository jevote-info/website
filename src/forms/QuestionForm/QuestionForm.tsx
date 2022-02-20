import { QuestionAnswer, SurveyAnswers } from '../../types/answers';
import { LightweightCategory } from '../../types/category';
import { Question } from '../../types/question';
import { MultichoiceQuestionForm } from './MultichoiceQuestionForm';
import { SimpleQuestionForm } from './SimpleQuestionForm';

interface QuestionFormProps {
  formId: string;
  answers: SurveyAnswers;
  currentCategory: LightweightCategory;
  currentQuestion: Question;
  onChange(values: QuestionAnswer): void;
  onSubmit(values: QuestionAnswer): void;
}

export function QuestionForm(props: QuestionFormProps) {
  const { currentQuestion } = props;

  return currentQuestion.multichoice ? (
    <MultichoiceQuestionForm {...props} />
  ) : (
    <SimpleQuestionForm {...props} />
  );
}
