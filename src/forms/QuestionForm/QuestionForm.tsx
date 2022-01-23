import { useBreakpointValue, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import QuestionField from '../../components/QuestionField';
import { QuestionAnswer } from '../../types/answers';
import Category from '../../types/category';
import Question from '../../types/question';
import { SubmitButtonsDesktop } from './SubmitButtons.desktop';
import { SubmitButtonsMobile } from './SubmitButtons.mobile';

interface CategoryFormProps {
  currentCategory: Category;
  currentQuestion: Question;
  defaultValues: QuestionAnswer;
  onSubmit(values: QuestionAnswer): void;
  nextPath: string;
  previousPath: string | null;
}

export function QuestionForm(props: CategoryFormProps) {
  const { currentCategory, currentQuestion, defaultValues, onSubmit, nextPath, previousPath } =
    props;

  const variant = useBreakpointValue({ base: 'mobile', lg: 'desktop' });
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const isFinal = nextPath === '/resultats';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <QuestionField
        currentCategory={currentCategory}
        question={currentQuestion}
        control={control}
      />
      {variant === 'desktop' ? (
        <SubmitButtonsDesktop isFinal={isFinal} previousPath={previousPath} />
      ) : (
        <SubmitButtonsMobile isFinal={isFinal} previousPath={previousPath} />
      )}
    </form>
  );
}
