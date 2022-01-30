import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useRadioGroup,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { QuestionAnswer } from '../types/answers';
import { Question } from '../types/question';
import { ChoiceRadio } from './ChoiceRadio';
import { ImportanceMeter } from './ImportanceMeter';

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
      <Box width="full" mb={5}>
        <HStack align="center" mb={1}>
          <Heading flex={1} size="md" as="h1">
            {question.title}
          </Heading>
          {question.help && (
            <Popover>
              <PopoverTrigger>
                <IconButton
                  variant="outline"
                  icon={<InfoOutlineIcon />}
                  aria-label="Informations"
                  borderRadius="full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>{question.help}</PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </HStack>
        <Heading size="xs" as="h2">
          {question.description}
        </Heading>
      </Box>
      <Box width="full">
        {error?.type === 'required' && (
          <Box mb={5} p={3} borderRadius={6} bgColor="red.100">
            <Text color="red.600" fontWeight="bold">
              Veuillez sélectionner une réponse ou &quot;Ne se prononce pas&quot;.
            </Text>
          </Box>
        )}
        <VStack {...getRootProps()} alignItems="flex-start" spacing={5}>
          {question.choices.map(choice => (
            <ChoiceRadio
              {...getRadioProps({ value: choice.id })}
              key={choice.id}
              label={choice.text}
            />
          ))}
        </VStack>
        <ImportanceMeter control={control} />
      </Box>
    </Box>
  );
};

export default Question;
