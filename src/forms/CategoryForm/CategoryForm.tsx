import { useBreakpointValue, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import QuestionField from '../../components/QuestionField';
import Answers from '../../types/answers';
import Category from '../../types/category';
import { SubmitButtonsDesktop } from './SubmitButtons.desktop';
import { SubmitButtonsMobile } from './SubmitButtons.mobile';

interface CategoryFormProps {
  currentCategory: Category;
  previousCategory: Category | null;
  nextCategory: Category | null;
  defaultValues: Answers[Category['id']];
  onSubmit(values: Answers[Category['id']]): void;
}

export function CategoryForm(props: CategoryFormProps) {
  const { currentCategory, previousCategory, nextCategory, defaultValues, onSubmit } = props;

  const variant = useBreakpointValue({ base: 'mobile', lg: 'desktop' });
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="16px" alignItems="flex-start">
        {currentCategory.questions.map(question => (
          <QuestionField key={question.id} question={question} control={control} />
        ))}
      </VStack>
      {variant === 'desktop' ? (
        <SubmitButtonsDesktop previousCategory={previousCategory} nextCategory={nextCategory} />
      ) : (
        <SubmitButtonsMobile previousCategory={previousCategory} nextCategory={nextCategory} />
      )}
    </form>
  );
}
