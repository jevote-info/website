import { useRadio, UseRadioProps, Box, useColorModeValue, Button } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface ImportanceRadioProps extends UseRadioProps {
  children: ReactNode;
}

export function ImportanceRadio(props: ImportanceRadioProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Button
        {...checkbox}
        as={Box}
        cursor="pointer"
        width="full"
        _checked={{
          bgColor: 'primary.500',
          color: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
      >
        {props.children}
      </Button>
    </Box>
  );
}
