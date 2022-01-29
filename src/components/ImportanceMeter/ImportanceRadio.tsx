import { useRadio, UseRadioProps, Box, Button } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface ImportanceRadioProps extends UseRadioProps {
  checkedColor: string;
  children: ReactNode;
}

export function ImportanceRadio(props: ImportanceRadioProps) {
  const { checkedColor, children } = props;

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
          bgColor: checkedColor,
          color: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
      >
        {children}
      </Button>
    </Box>
  );
}
