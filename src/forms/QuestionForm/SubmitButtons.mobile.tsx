import { ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, useColorModeValue } from '@chakra-ui/react';
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

export function SubmitButtonsMobile(props: SubmitButtonsProps) {
  const { previousPath, currentCategory, currentQuestion, categoryAnswers, canGoToResult } = props;

  const bgColor = useColorModeValue('white', 'black');

  return (
    <Box height="64px">
      <HStack
        spacing={3}
        p={3}
        justifyContent="start"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bgColor={bgColor}
        width="full"
      >
        <Box flex={1}>
          {canGoToResult ? (
            <Link href="/resultat" passHref>
              <Button as="a" colorScheme="blue">
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
        </Box>
        {previousPath && (
          <Link href={previousPath} passHref>
            <Button as="a" variant="outline" colorScheme="primary">
              <ChevronUpIcon />
            </Button>
          </Link>
        )}
        <Button type="submit" colorScheme="primary">
          Suivant
        </Button>
      </HStack>
    </Box>
  );
}
