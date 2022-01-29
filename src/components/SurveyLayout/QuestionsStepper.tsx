import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';
import { CategoryAnswers } from '../../types/answers';
import Category from '../../types/category';
import Question from '../../types/question';

interface QuestionsStepperProps {
  currentCategory: Category;
  currentQuestion: Question;
  categoryAnswers?: CategoryAnswers;
}

export function QuestionsStepper(props: QuestionsStepperProps) {
  const { currentCategory, currentQuestion, categoryAnswers } = props;

  return (
    <Menu>
      <MenuButton as={Button}>
        Question {currentQuestion.order}/{currentCategory.questions.length}
      </MenuButton>
      <MenuList>
        {currentCategory.questions.map(question => (
          <NextLink
            key={question.order}
            href={`/categories/${currentCategory.slug}/questions/${question.order}`}
            passHref
          >
            <MenuItem as="a" bgColor={currentQuestion.id === question.id ? 'green.100' : undefined}>
              Question {question.order}{' '}
              {categoryAnswers?.[question.id]?.choiceId ? (
                <Box ml="auto" p={1} color="green.400">
                  <FontAwesomeIcon width="15px" height="15px" icon={faCheckCircle} />
                </Box>
              ) : null}
            </MenuItem>
          </NextLink>
        ))}
      </MenuList>
    </Menu>
  );
}
