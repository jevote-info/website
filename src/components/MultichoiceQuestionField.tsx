import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Tag,
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
  useCheckboxGroup,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { MultichoiceQuestionAnswer } from '../types/answers';
import { Question } from '../types/question';
import { ChoiceCheckbox } from './ChoiceCheckbox';
import { ImportanceMeter } from './ImportanceMeter';

interface MultichoiceQuestionProps {
  question: Question;
  control: Control<MultichoiceQuestionAnswer>;
}

export function MultichoiceQuestionField(props: MultichoiceQuestionProps) {
  const { question, control } = props;

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'choices',
    control,
    rules: {
      required: true,
    },
  });

  const { getCheckboxProps } = useCheckboxGroup({
    value,
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
        {question.description && (
          <Heading size="xs" as="h2">
            {question.description}
          </Heading>
        )}
        <Tag mt={3} as="h3" size="lg" colorScheme="primary" variant="solid">
          Plusieurs r??ponses possibles
        </Tag>
      </Box>
      <Box width="full">
        {error?.type === 'required' && (
          <Box mb={5} p={3} borderRadius={6} bgColor="red.100">
            <Text color="red.600" fontWeight="bold">
              Veuillez s??lectionner une r??ponse ou &quot;Ne se prononce pas&quot;.
            </Text>
          </Box>
        )}
        <VStack alignItems="flex-start" spacing={5}>
          {question.choices.map(choice => (
            <ChoiceCheckbox
              {...getCheckboxProps({ value: choice.id })}
              key={choice.id}
              label={choice.text}
            />
          ))}
        </VStack>
        <ImportanceMeter control={control} />
      </Box>
    </Box>
  );
}
