import { useRadio, UseRadioProps, Box, useColorModeValue, Button } from '@chakra-ui/react';
import React, { FC } from 'react';

const ImportanceRadio: FC<UseRadioProps> = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const borderColor = useColorModeValue('primary.900', 'primary.200');

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
};

export default ImportanceRadio;
