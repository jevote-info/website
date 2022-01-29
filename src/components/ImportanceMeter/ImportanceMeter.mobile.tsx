import { useRadioGroup, HStack, Text, Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { ImportanceRadio } from './ImportanceRadio';
import { faFireAlt, faSnowflake, faMehBlank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Importance } from './ImportanceMeter.types';

interface ImportanceMeterMobileProps {
  radioGroup: ReturnType<typeof useRadioGroup>;
}

export function ImportanceMeterMobile(props: ImportanceMeterMobileProps) {
  const { radioGroup } = props;

  const { getRootProps, getRadioProps } = radioGroup;

  const group = getRootProps();
  const notImportantRadioProps = getRadioProps({ value: `${Importance.NOT_IMPORTANT}` });
  const neutralRadioProps = getRadioProps({ value: `${Importance.NEUTRAL}` });
  const importantRadioProps = getRadioProps({ value: `${Importance.IMPORTANT}` });

  const bgColor = useColorModeValue('white', 'black');

  return (
    <Box
      p={3}
      pb={1}
      position="fixed"
      left={0}
      right={0}
      bottom="64px"
      bgColor={bgColor}
      boxShadow="1px -1px 10px -3px rgb(0 0 0 / 30%)"
    >
      <HStack {...group} justify="center">
        <ImportanceRadio checkedColor="green.300" {...notImportantRadioProps}>
          <FontAwesomeIcon width={15} height={15} icon={faSnowflake} />
          {notImportantRadioProps.isChecked && <Text ml={2}>Peu important</Text>}
        </ImportanceRadio>
        <ImportanceRadio checkedColor="primary.300" {...neutralRadioProps}>
          <FontAwesomeIcon width={15} height={15} icon={faMehBlank} />
          {neutralRadioProps.isChecked && <Text ml={2}>Neutre</Text>}
        </ImportanceRadio>
        <ImportanceRadio checkedColor="red.300" {...importantRadioProps}>
          <FontAwesomeIcon width={15} height={15} icon={faFireAlt} />
          {importantRadioProps.isChecked && <Text ml={2}>Important</Text>}
        </ImportanceRadio>
      </HStack>
    </Box>
  );
}
