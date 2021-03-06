import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';
import { CategoryAnswers } from '../../types/answers';
import { LightweightCategory } from '../../types/category';
import { Question } from '../../types/question';
import { isQuestionAnswered } from '../../utils/isQuestionAnswered';

interface QuestionsStepperProps {
  currentCategory: LightweightCategory;
  currentQuestion: Question;
  categoryAnswers?: CategoryAnswers;
}

export function QuestionsStepper(props: QuestionsStepperProps) {
  const { currentCategory, currentQuestion, categoryAnswers } = props;

  return (
    <Menu>
      <MenuButton as={Button} variant="outline">
        Question {currentQuestion.order}/{currentCategory.questions.length}
      </MenuButton>
      <MenuList>
        {currentCategory.questions.map(question => (
          <NextLink
            key={question.order}
            href={`/categories/${currentCategory.slug}/questions/${question.order}`}
            passHref
          >
            <MenuItem as="a" color={currentQuestion.id === question.id ? 'primary.300' : undefined}>
              Question {question.order}{' '}
              {isQuestionAnswered(categoryAnswers?.[question.id]) ? (
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
