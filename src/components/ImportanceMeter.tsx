import { useRadioGroup, Stack, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { ImportanceRadio } from './ImportanceRadio';
import { faFireAlt, faSnowflake, faMehBlank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useController, Control } from 'react-hook-form';
import Question from '../types/question';

export enum Importance {
  NOT_IMPORTANT = 0.5,
  NEUTRAL = 1,
  IMPORTANT = 1.5,
}

interface ImportanceMeterProps {
  questionId: Question['id'];
  control: Control<any>;
}

const ImportanceMeter = (props: ImportanceMeterProps) => {
  const { questionId, control } = props;

  const {
    field: { onChange, name, value },
  } = useController({
    name: `${questionId}.weight`,
    control,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    value: `${value}`,
    name,
    onChange: value => onChange(+value),
  });

  const group = getRootProps();
  const notImportantRadioProps = getRadioProps({ value: `${Importance.NOT_IMPORTANT}` });
  const neutralRadioProps = getRadioProps({ value: `${Importance.NEUTRAL}` });
  const importantRadioProps = getRadioProps({ value: `${Importance.IMPORTANT}` });

  return (
    <Flex direction="column" mt={8}>
      <Text mb={3} fontWeight="semibold">
        Ce sujet est-il important pour vous ?
      </Text>
      <Stack {...group} direction={['column', 'column', 'row']}>
        <ImportanceRadio {...notImportantRadioProps}>
          <FontAwesomeIcon width={15} height={15} icon={faSnowflake} />
          <Text ml={2}>Peu important</Text>
        </ImportanceRadio>
        <ImportanceRadio {...neutralRadioProps}>
          <FontAwesomeIcon width={15} height={15} icon={faMehBlank} />
          <Text ml={2}>Neutre</Text>
        </ImportanceRadio>
        <ImportanceRadio {...importantRadioProps}>
          <FontAwesomeIcon width={15} height={15} icon={faFireAlt} />
          <Text ml={2}>Important</Text>
        </ImportanceRadio>
      </Stack>
    </Flex>
  );
};

export default ImportanceMeter;
