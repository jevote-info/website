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
  Image,
  Link,
  Progress,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef } from 'react';
import { useCategoryProgress } from '../../hooks/useCategoryProgress';
import { useSurveyStore } from '../../stores/survey';
import { Category } from '../../types/category';
import { Question } from '../../types/question';
import { Survey } from '../../types/survey';
import { ColorModeSwitch } from '../ColorModeSwitch';
import { MenuLinks } from '../MenuLinks';
import { CategoryItem } from './CategoryItem';
import { QuestionsStepper } from './QuestionsStepper';

interface SurveyLayoutProps {
  survey: Survey;
  currentCategory: Category;
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
        <Flex width="full" pt={3}>
          <Flex flex={1} alignItems="start">
            <NextLink href="/" passHref>
              <Link>
                <Image src="/logo.png" alt="logo" w="64px" />
              </Link>
            </NextLink>
          </Flex>

          <Flex justifyContent="center" flex={1}>
            <Button
              ref={buttonRef}
              p={0}
              mb={3}
              flexDirection="column"
              alignItems="center"
              variant="ghost"
              bgColor="transparent"
              onClick={onOpen}
              width={150}
              height="fit-content"
            >
              <Image src={currentCategory.image} alt={currentCategory.title} height="30px" mb={3} />
              <Text fontSize="sm" fontWeight="semibold" whiteSpace="normal">
                {currentCategory.title}
              </Text>
            </Button>
          </Flex>

          <Flex align="start" justifyContent="end" flex={1} pt={3}>
            <ColorModeSwitch />
          </Flex>
        </Flex>
        <Box height="full" width="full" position="relative">
          <Container as={VStack} alignItems="start" maxW="container.md" p={0} m={0} spacing={5}>
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

          <DrawerFooter>
            <MenuLinks />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
