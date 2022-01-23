import { useRadio, UseRadioProps, Box, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface ChoiceRadioProps extends UseRadioProps {
  children: ReactNode;
}

export function ChoiceRadio(props: ChoiceRadioProps) {
  const {
    getInputProps,
    getCheckboxProps,
    state: { isChecked },
  } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" width="full">
      <input {...input} />
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
          <FontAwesomeIcon width={20} height={20} icon={isChecked ? faCheckCircle : faCircle} />
        </Box>
        {props.children}
      </Button>
    </Box>
  );
}
