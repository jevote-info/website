import { useRadio, UseRadioProps, Box } from '@chakra-ui/react';
import React, { FC } from 'react';

const ImportanceRadio: FC<UseRadioProps> = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        color="primary.900"
        borderColor="primary.900"
        fontWeight="semibold"
        display="flex"
        flexDirection="row"
        alignItems="center"
        _checked={{
          bg: 'primary.900',
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
