import { useCheckbox, UseCheckboxProps, Box, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

interface ChoiceCheckboxProps extends UseCheckboxProps {
  label: string;
}

export function ChoiceCheckbox(props: ChoiceCheckboxProps) {
  const { label, ...checkboxProps } = props;

  const {
    getInputProps,
    getCheckboxProps,
    state: { isChecked },
  } = useCheckbox(checkboxProps);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" width="full">
      <input {...input} aria-label={label} />
      <Button
        {...checkbox}
        maxWidth="100%"
        as={Box}
        cursor="pointer"
        width="full"
        justifyContent="start"
        _checked={{
          bgColor: 'primary.500',
          color: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        whiteSpace="normal"
        height="fit-content"
        p={[3, 3, 5]}
      >
        <Box mr={3} color="white">
          <FontAwesomeIcon width={20} height={20} icon={isChecked ? faCheckSquare : faSquare} />
        </Box>
        {label}
      </Button>
    </Box>
  );
}
