import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HStack, Switch, useColorMode } from '@chakra-ui/react';
import usePrimaryColorModeValue from '../hooks/usePrimaryColorModeValue';

export function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  const primaryColor = usePrimaryColorModeValue();
  const isDark = colorMode === 'dark';

  return (
    <HStack align="center">
      <SunIcon color={primaryColor} mr={2} />
      <Switch colorScheme="primary" isChecked={isDark} onChange={toggleColorMode} />
      <MoonIcon color={primaryColor} ml={2} />
    </HStack>
  );
}
