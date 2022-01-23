import { Button, Menu, MenuButton, MenuItem, MenuList, useBreakpointValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import Category from '../../types/category';
import Question from '../../types/question';

interface QuestionsStepperProps {
  currentCategory: Category;
  currentQuestion: Question;
}

export function QuestionsStepper(props: QuestionsStepperProps) {
  const { currentCategory, currentQuestion } = props;
  const buttonProps = useBreakpointValue({
    base: {
      p: 0,
      height: 'fit-content',
      float: 'right',
      variant: 'outline',
    } as const,
    lg: {
      mb: 3,
      variant: 'ghost',
    } as const,
  });

  return (
    <Menu>
      <MenuButton {...buttonProps} as={Button}>
        {currentQuestion.order}/{currentCategory.questions.length}
      </MenuButton>
      <MenuList>
        {currentCategory.questions.map(({ order }) => (
          <NextLink
            key={order}
            href={`/categories/${currentCategory.slug}/questions/${order}`}
            passHref
          >
            <MenuItem as="a">Question {order}</MenuItem>
          </NextLink>
        ))}
      </MenuList>
    </Menu>
  );
}
