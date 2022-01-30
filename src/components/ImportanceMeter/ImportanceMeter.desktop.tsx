import { useRadioGroup, Stack, Flex, Text } from '@chakra-ui/react';
import { ImportanceRadio } from './ImportanceRadio';
import { faFireAlt, faSnowflake, faMehBlank } from '@fortawesome/free-solid-svg-icons';
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
      </Stack>
    </Flex>
  );
}
