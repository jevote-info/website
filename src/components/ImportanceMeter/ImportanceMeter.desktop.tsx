import { useRadioGroup, Stack, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { ImportanceRadio } from './ImportanceRadio';
import { faFireAlt, faSnowflake, faMehBlank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Importance } from './ImportanceMeter.types';

interface ImportanceMeterDesktopProps {
  radioGroup: ReturnType<typeof useRadioGroup>;
}

export function ImportanceMeterDesktop(props: ImportanceMeterDesktopProps) {
  const { radioGroup } = props;

  const { getRootProps, getRadioProps } = radioGroup;

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
        <ImportanceRadio checkedColor="green.300" {...notImportantRadioProps}>
          <FontAwesomeIcon width={15} height={15} icon={faSnowflake} />
          <Text ml={2}>Peu important</Text>
        </ImportanceRadio>
        <ImportanceRadio checkedColor="primary.300" {...neutralRadioProps}>
          <FontAwesomeIcon width={15} height={15} icon={faMehBlank} />
          <Text ml={2}>Neutre</Text>
        </ImportanceRadio>
        <ImportanceRadio checkedColor="red.300" {...importantRadioProps}>
          <FontAwesomeIcon width={15} height={15} icon={faFireAlt} />
          <Text ml={2}>Important</Text>
        </ImportanceRadio>
      </Stack>
    </Flex>
  );
}
