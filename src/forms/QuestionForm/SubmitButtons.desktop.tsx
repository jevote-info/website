import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { QuestionsStepper } from '../../components/SurveyLayout/QuestionsStepper';
import { CategoryAnswers } from '../../types/answers';
import Category from '../../types/category';
import Question from '../../types/question';

interface SubmitButtonsProps {
  previousPath: string | null;
  currentCategory: Category;
  currentQuestion: Question;
  categoryAnswers?: CategoryAnswers;
  canGoToResult: boolean;
}

export function SubmitButtonsDesktop(props: SubmitButtonsProps) {
  const { canGoToResult, previousPath, currentCategory, currentQuestion, categoryAnswers } = props;

  return (
    <HStack mt={5} spacing={5} justifyContent="space-between">
      {previousPath && (
        <Link href={previousPath} passHref>
          <Button as="a" variant="outline" colorScheme="primary" size="lg">
            Précédent
          </Button>
        </Link>
      )}
      {canGoToResult ? (
        <Link href="/resultat" passHref>
          <Button as="a" colorScheme="primary" size="lg">
            Voir les résultats
          </Button>
        </Link>
      ) : (
        <QuestionsStepper
          currentCategory={currentCategory}
          currentQuestion={currentQuestion}
          categoryAnswers={categoryAnswers}
        />
      )}
      <Button type="submit" colorScheme="primary" ml="auto" size="lg">
        Suivant
      </Button>
    </HStack>
  );
}
