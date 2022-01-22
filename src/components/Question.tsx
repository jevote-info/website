import { Box, Heading, Radio, RadioGroup, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useSurveyStore } from '../stores/survey';
import Survey from '../types/survey';
import ImportanceMeter from './ImportanceMeter';

interface QuestionProps {
  question: Survey[number]['questions'][number];
}

const Question = ({ question }: QuestionProps) => {
  const { answers, addAnswer } = useSurveyStore();

  const questionAnswer = useMemo(() => {
    return answers.find(({ questionId }) => questionId === question.id);
  }, [answers, question]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor="primary.900"
      overflow="hidden"
      width="100%"
    >
      <Box color="white" bgColor="primary.900" padding="16px">
        <Heading size="sm" as="h2" marginBottom="4px">
          {question.title}
        </Heading>
        <Heading size="xs" as="h3">
          {question.description}
        </Heading>
      </Box>
      <Box padding="16px">
        <RadioGroup
          value={questionAnswer?.choiceId}
          onChange={value => addAnswer({ questionId: question.id, choiceId: value })}
        >
          <VStack alignItems="flex-start" spacing="8px">
            {question.choices.map(choice => (
              <Radio value={choice.id} key={choice.id} colorScheme="primary">
                {choice.text}
              </Radio>
            ))}
            <Radio value="NO_ANSWER" colorScheme="primary">
              Ne se prononce pas
            </Radio>
          </VStack>
        </RadioGroup>
        <ImportanceMeter />
      </Box>
    </Box>
  );
};

export default Question;
