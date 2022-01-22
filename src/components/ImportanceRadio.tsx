import { useRadio, UseRadioProps, Box, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';

const ImportanceRadio: FC<UseRadioProps> = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const borderColor = useColorModeValue('primary.900', 'primary.200');

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        color="primary"
        borderColor={borderColor}
        fontWeight="semibold"
        display="flex"
        flexDirection="row"
        alignItems="center"
        _checked={{
          bgColor: 'primary.500',
          color: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        padding="8px"
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default ImportanceRadio;
