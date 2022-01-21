import { useRadioGroup, HStack, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import ImportanceRadio from './ImportanceRadio';
import { faFireAlt, faSnowflake, faMehBlank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

enum Importance {
  NOT_IMPORTANT = 'NOT_IMPORTANT',
  NEUTRAL = 'NEUTRAL',
  IMPORTANT = 'IMPORTANT',
}

const ImportanceMeter = () => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'importance',
    defaultValue: Importance.NEUTRAL,
    onChange: console.log,
  });

  const group = getRootProps();
  const notImportantRadioProps = getRadioProps({ value: Importance.NOT_IMPORTANT });
  const neutralRadioProps = getRadioProps({ value: Importance.NEUTRAL });
  const importantRadioProps = getRadioProps({ value: Importance.IMPORTANT });

  return (
    <Flex direction="column" marginTop="32px">
      <Text marginBottom="8px" fontWeight="semibold">
        Ce sujet est-il important pour vous ?
      </Text>
      <HStack {...group}>
        <ImportanceRadio {...notImportantRadioProps}>
          <FontAwesomeIcon icon={faSnowflake} />
          <Text marginLeft="4px">Peu important</Text>
        </ImportanceRadio>
        <ImportanceRadio {...neutralRadioProps}>
          <FontAwesomeIcon icon={faMehBlank} />
          <Text marginLeft="4px">Neutre</Text>
        </ImportanceRadio>
        <ImportanceRadio {...importantRadioProps}>
          <FontAwesomeIcon icon={faFireAlt} />
          <Text marginLeft="4px">Important</Text>
        </ImportanceRadio>
      </HStack>
    </Flex>
  );
};

export default ImportanceMeter;
