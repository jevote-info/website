import { useRadio, UseRadioProps, Box, Button, Text } from '@chakra-ui/react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIsMobile } from '../../hooks/useIsMobile';

interface ImportanceRadioProps extends UseRadioProps {
  checkedColor: string;
  label: string;
  icon: IconDefinition;
}

export function ImportanceRadio(props: ImportanceRadioProps) {
  const { checkedColor, label, icon } = props;

  const isMobile = useIsMobile();

  const {
    getInputProps,
    getCheckboxProps,
    state: { isChecked },
  } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} aria-label={label} />
      <Button
        {...checkbox}
        as={Box}
        cursor="pointer"
        width="full"
        _checked={{
          bgColor: checkedColor,
          color: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
      >
        <FontAwesomeIcon width={15} height={15} icon={icon} />
        {(!isMobile || isChecked) && <Text ml={2}>{label}</Text>}
      </Button>
    </Box>
  );
}
