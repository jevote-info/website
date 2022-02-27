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
} from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import { isSimpleQuestionAnswer, SurveyAnswers } from '../../../types/answers';
import { Survey } from '../../../types/survey';
import { CategoryIcon } from '../../SurveyLayout/CategoryIcon';
import { DetailedResultsSource } from './DetailedResults.Source';

interface DetailedResultsProps {
  survey: Survey;
  answers: SurveyAnswers;
  politicians: Record<Politician['id'], Politician>;
}

export function DetailedResults(props: DetailedResultsProps) {
  const { survey, answers, politicians } = props;

  return (
    <Box>
      <Heading as="h3" mb={5} textAlign="center">
        Découvrez votre affinité envers chaque candidat pour toutes les questions
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
                  const questionAnswer = answers[category.id][question.id];
                  const isChoiceSelected = isSimpleQuestionAnswer(questionAnswer)
                    ? questionAnswer.choiceId === choice.id
                    : questionAnswer.choices.includes(choice.id);
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
                            <Tag size="lg" colorScheme={isChoiceSelected ? 'primary' : 'gray'}>
                              <Text>
                                {politicians[politicianScore.politicianId].name} :{' '}
                                {politicianScore.score}
                              </Text>
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
