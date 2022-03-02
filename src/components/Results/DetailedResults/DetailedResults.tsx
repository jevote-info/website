import { QuestionIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Wrap,
  WrapItem,
  Tag,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  Link,
  Tooltip,
} from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import { isSimpleQuestionAnswer, SurveyAnswers } from '../../../types/answers';
import { Survey } from '../../../types/survey';
import { CategoryIcon } from '../../SurveyLayout/CategoryIcon';
import { DetailedResultsSource } from './DetailedResults.Source';

interface DetailedResultsProps {
  survey: Survey;
  answers?: SurveyAnswers;
  politicians: Record<Politician['id'], Politician>;
}

export function DetailedResults(props: DetailedResultsProps) {
  const { survey, answers, politicians } = props;

  return (
    <Box mt="5">
      <Heading as="h3" mb={10} textAlign="center">
        Comprenez vos résultats avec le score des candidats pour chaque question
      </Heading>
      <Accordion defaultIndex={[0]} allowMultiple w="full">
        {survey.map(category => (
          <AccordionItem key={category.id} spacing={5} alignItems="flex-start" w="full">
            <AccordionButton py={3}>
              <HStack flex={1} spacing={5}>
                <CategoryIcon category={category} />
                <Heading size="lg" textAlign="left">
                  {category.title}
                </Heading>
              </HStack>
              <AccordionIcon />
            </AccordionButton>
            {category.questions.map(question => (
              <AccordionPanel
                as={VStack}
                key={question.id}
                spacing={3}
                alignItems="flex-start"
                w="full"
              >
                <Heading size="md">
                  {question.order}. {question.title}
                </Heading>
                {question.source && <DetailedResultsSource questionSource={question.source} />}
                {question.choices.map(choice => {
                  const questionAnswer = answers ? answers[category.id][question.id] : undefined;
                  const isChoiceSelected =
                    answers && questionAnswer
                      ? isSimpleQuestionAnswer(questionAnswer)
                        ? questionAnswer.choiceId === choice.id
                        : questionAnswer.choices.includes(choice.id)
                      : false;
                  return (
                    <VStack
                      key={choice.id}
                      alignItems="flex-start"
                      p={3}
                      borderColor={isChoiceSelected ? 'primary.500' : 'gray.200'}
                      borderWidth={isChoiceSelected ? 3 : 1}
                      borderStyle="solid"
                      borderRadius="lg"
                      w="full"
                    >
                      <Heading size="sm">{choice.text}</Heading>
                      <Wrap>
                        {choice.politicianScores.map(politicianScore => (
                          <WrapItem key={politicianScore.id}>
                            <Tag
                              size="lg"
                              colorScheme={isChoiceSelected ? 'primary' : 'gray'}
                              variant={isChoiceSelected ? 'solid' : 'subtle'}
                            >
                              <HStack spacing={3}>
                                <Text>
                                  {politicians[politicianScore.politicianId].name} :{' '}
                                  {politicianScore.score}
                                </Text>
                                {politicianScore.source && (
                                  <Tooltip label="Source" fontSize="md">
                                    <Button
                                      variant="link"
                                      minWidth="fit-content"
                                      w="fit-content"
                                      as={Link}
                                      href={politicianScore.source}
                                      isExternal
                                    >
                                      <QuestionIcon />
                                    </Button>
                                  </Tooltip>
                                )}
                              </HStack>
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </VStack>
                  );
                })}
              </AccordionPanel>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
