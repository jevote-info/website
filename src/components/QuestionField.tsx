import { Box, Text, Heading, VStack, useRadioGroup } from '@chakra-ui/react';
import React from 'react';
import { ImportanceMeter } from './ImportanceMeter';
import { useController, Control } from 'react-hook-form';
import { Question } from '../types/question';
import { QuestionAnswer } from '../types/answers';
import { ChoiceRadio } from './ChoiceRadio';
import { QuestionsStepper } from './SurveyLayout/QuestionsStepper';
import { Category } from '../types/category';
import { useIsMobile } from '../hooks/useIsMobile';

interface QuestionProps {
  question: Question;
  control: Control<QuestionAnswer>;
}

const Question = (props: QuestionProps) => {
  const { question, control } = props;

  const {
    field: { onChange, name, value },
    fieldState: { error },
  } = useController({
    name: 'choiceId',
    control,
    rules: {
      required: true,
    },
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    value,
    name,
    onChange,
  });

  return (
    <Box width="full" mb={['116px', '116px', 5]}>
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
              Veuillez sélectionner une réponse ou &quot;Ne se prononce pas&quot;.
            </Text>
          </Box>
        )}
        <VStack {...getRootProps()} alignItems="flex-start" spacing={5}>
          {question.choices.map(choice => (
            <ChoiceRadio {...getRadioProps({ value: choice.id })} key={choice.id}>
              {choice.text}
            </ChoiceRadio>
          ))}
          <ChoiceRadio {...getRadioProps({ value: 'NO_ANSWER' })}>Ne se prononce pas</ChoiceRadio>
        </VStack>
        <ImportanceMeter control={control} />
      </Box>
    </Box>
  );
};

export default Question;
