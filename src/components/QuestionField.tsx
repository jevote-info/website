import { Box, Text, Heading, Radio, RadioGroup, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import Survey from '../types/survey';
import ImportanceMeter from './ImportanceMeter';
import { useController, Control } from 'react-hook-form';

interface QuestionProps {
  question: Survey[number]['questions'][number];
  control: Control<any>;
}

const Question = (props: QuestionProps) => {
  const { question, control } = props;

  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const {
    field,
    fieldState: { error },
  } = useController({
    name: `${question.id}.choiceId`,
    control,
    rules: {
      required: true,
    },
  });

  return (
    <Box p={5} bgColor={bgColor} borderRadius="lg" boxShadow="sm" width="100%">
      <Box mb={5}>
        <Heading size="md" as="h2" marginBottom="4px">
          {question.title}
        </Heading>
        <Heading size="xs" as="h3">
          {question.description}
        </Heading>
      </Box>
      <Box>
        {error?.type === 'required' && (
          <Box mb={5} p={3} borderRadius={6} bgColor="red.100">
            <Text color="red.600" fontWeight="bold">
              Veuillez sélectionner une réponse ou "Ne se prononce pas".
            </Text>
          </Box>
        )}
        <RadioGroup {...field}>
          <VStack alignItems="flex-start" spacing={5}>
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
        <ImportanceMeter questionId={question.id} control={control} />
      </Box>
    </Box>
  );
};

export default Question;
