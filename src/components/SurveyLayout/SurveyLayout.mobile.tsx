import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Link,
  Progress,
  useDisclosure,
  VStack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef } from 'react';
import { useCategoryProgress } from '../../hooks/useCategoryProgress';
import { useSurveyStore } from '../../stores/survey';
import { LightweightCategory } from '../../types/category';
import { Question } from '../../types/question';
import { LightweightSurvey } from '../../types/survey';
import { Logo } from '../Logo';
import { MenuLinks } from '../MenuLinks';
import { CategoryIcon } from './CategoryIcon';
import { CategoryItem } from './CategoryItem';
import { QuestionsStepper } from './QuestionsStepper';

interface SurveyLayoutProps {
  survey: LightweightSurvey;
  currentCategory: LightweightCategory;
  currentQuestion: Question;
  children: ReactNode;
}

export function SurveyLayoutMobile(props: SurveyLayoutProps) {
  const { survey, currentCategory, children, currentQuestion } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { asPath } = useRouter();

  const buttonRef = useRef(null);
  const { answers } = useSurveyStore();

  useEffect(() => {
    onClose();
  }, [asPath, onClose]);

  const { progress, isComplete, nbAnswers } = useCategoryProgress(
    currentCategory,
    answers[currentCategory.id],
  );

  return (
    <>
      <VStack height="full" px={5} spacing={0}>
        <Flex width="full" pt={3} pb={5} alignItems="center" justifyContent="space-between">
          <NextLink href="/" passHref>
            <Link flex={1} _hover={{ textDecoration: 'none' }}>
              <Logo />
            </Link>
          </NextLink>

          <Button
            ref={buttonRef}
            p={0}
            flexDirection="row"
            alignItems="center"
            variant="ghost"
            onClick={onOpen}
            ml="5"
            flex="1"
          >
            <CategoryIcon category={currentCategory} />
            <Text ml="2" whiteSpace="pre-line" fontSize="sm">
              {currentCategory.title}
            </Text>
          </Button>
        </Flex>
        <Box height="full" width="full">
          <Container
            as={VStack}
            alignItems="start"
            maxW="container.md"
            p={0}
            m={0}
            pb={6}
            spacing={5}
            position="relative"
          >
            <HStack width="full">
              <QuestionsStepper
                currentCategory={currentCategory}
                currentQuestion={currentQuestion}
                categoryAnswers={answers[currentCategory.id]}
              />
              <Box flex={1} p={3}>
                <Progress
                  value={progress}
                  hasStripe
                  colorScheme={isComplete ? 'green' : 'primary'}
                  aria-label={`${nbAnswers} questions remplies sur ${currentCategory.questions.length}`}
                />
              </Box>
            </HStack>
            {children}
          </Container>
        </Box>
      </VStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={buttonRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Catégories</DrawerHeader>

          <DrawerBody paddingInlineStart={2} paddingInlineEnd={2}>
            <VStack alignItems="start">
              {survey.map(category => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  categoryAnswers={answers[category.id]}
                  isActive={category.id === currentCategory.id}
                />
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter flexDirection="column">
            <MenuLinks withColorModeSwitch stackSocialNetwork />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
