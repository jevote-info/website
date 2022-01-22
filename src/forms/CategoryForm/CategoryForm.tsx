import { VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import QuestionField from '../../components/QuestionField';
import Answers from '../../types/answers';
import Category from '../../types/category';

interface CategoryFormProps {
  formId: string;
  category: Category;
  defaultValues: Answers[Category['id']];
  onSubmit(values: Answers[Category['id']]): void;
}

export function CategoryForm(props: CategoryFormProps) {
  const { formId, category, defaultValues, onSubmit } = props;

  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="16px" alignItems="flex-start">
        {category.questions.map(question => (
          <QuestionField key={question.id} question={question} control={control} />
        ))}
      </VStack>
    </form>
  );
}
