import { useColorModeValue } from '@chakra-ui/react';

const usePrimaryColorModeValue = () => {
  return useColorModeValue('primary.600', 'primary.200');
};

export default usePrimaryColorModeValue;
