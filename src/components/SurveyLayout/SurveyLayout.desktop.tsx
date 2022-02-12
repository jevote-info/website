import { Container, Flex, Grid, HStack, Link, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import { useSurveyStore } from '../../stores/survey';
import { Category } from '../../types/category';
import { Question } from '../../types/question';
import { Survey } from '../../types/survey';
import { ColorModeSwitch } from '../ColorModeSwitch';
import { Logo } from '../Logo';
import { MenuLinks } from '../MenuLinks';
import { CategoryItem } from './CategoryItem';
import { QuestionsStepper } from './QuestionsStepper';

interface SurveyLayoutProps {
  survey: Survey;
  currentCategory: Category;
  currentQuestion: Question;
  children: ReactNode;
}

export function SurveyLayoutDesktop(props: SurveyLayoutProps) {
  const { survey, currentCategory, children, currentQuestion } = props;

  const { answers } = useSurveyStore();

  return (
    <VStack height="full" align="start">
      <HStack width="full" align="center" justify="space-between" px={[3, 3, 5]} py={3}>
        <NextLink href="/" passHref>
          <Link>
            <Logo />
          </Link>
        </NextLink>
        <HStack>
          <MenuLinks />
          <Flex align="center" marginLeft="8px">
            <ColorModeSwitch />
          </Flex>
        </HStack>
      </HStack>
      <Grid width="full" height="full" templateColumns="auto 1fr">
        <VStack p={5} alignItems="start" spacing={3}>
          {survey.map(category => (
            <CategoryItem
              key={category.id}
              category={category}
              categoryAnswers={answers[category.id]}
              isActive={category.id === currentCategory.id}
            />
          ))}
        </VStack>
        <Flex flexDirection="column" flex={1} alignItems="center" p={5} height="full">
          <Container
            as={VStack}
            alignItems="start"
            maxW="container.md"
            p={0}
            m={0}
            spacing={3}
            position="relative"
          >
            <QuestionsStepper
              currentCategory={currentCategory}
              currentQuestion={currentQuestion}
              categoryAnswers={answers[currentCategory.id]}
            />
            {children}
          </Container>
        </Flex>
      </Grid>
    </VStack>
  );
}
