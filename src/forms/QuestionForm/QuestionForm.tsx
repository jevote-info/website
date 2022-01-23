import { useBreakpointValue, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import QuestionField from '../../components/QuestionField';
import { QuestionAnswer } from '../../types/answers';
import Question from '../../types/question';
import { SubmitButtonsDesktop } from './SubmitButtons.desktop';
import { SubmitButtonsMobile } from './SubmitButtons.mobile';

interface CategoryFormProps {
  currentQuestion: Question;
  defaultValues: QuestionAnswer;
  onSubmit(values: QuestionAnswer): void;
  nextPath: string;
  previousPath: string | null;
}

export function QuestionForm(props: CategoryFormProps) {
  const { currentQuestion, defaultValues, onSubmit, nextPath, previousPath } = props;

  const variant = useBreakpointValue({ base: 'mobile', lg: 'desktop' });
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const isFinal = nextPath === '/resultats';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <QuestionField question={currentQuestion} control={control} />
      {variant === 'desktop' ? (
        <SubmitButtonsDesktop isFinal={isFinal} previousPath={previousPath} />
      ) : (
        <SubmitButtonsMobile isFinal={isFinal} previousPath={previousPath} />
      )}
    </form>
  );
}
