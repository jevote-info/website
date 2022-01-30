import { useRadioGroup, HStack, Box, useColorModeValue } from '@chakra-ui/react';
import { ImportanceRadio } from './ImportanceRadio';
import { faFireAlt, faSnowflake, faMehBlank } from '@fortawesome/free-solid-svg-icons';
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
      width="full"
    >
      <HStack {...group} justify="center">
        <ImportanceRadio
          checkedColor="blue.400"
          icon={faSnowflake}
          label="Peu important"
          {...notImportantRadioProps}
        />
        <ImportanceRadio
          checkedColor="teal.400"
          icon={faMehBlank}
          label="Neutre"
          {...neutralRadioProps}
        />
        <ImportanceRadio
          checkedColor="red.400"
          icon={faFireAlt}
          label="Important"
          {...importantRadioProps}
        />
      </HStack>
    </Box>
  );
}
