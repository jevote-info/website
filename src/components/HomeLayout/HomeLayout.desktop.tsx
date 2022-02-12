import { ReactNode } from 'react';
import { Flex, Button, Link, VStack, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MenuLinks } from '../MenuLinks';
import { ColorModeSwitch } from '../ColorModeSwitch';
import { Logo } from '../Logo';

interface HomeLayoutProps {
  surveyPath: string;
  children: ReactNode;
}

export function HomeLayoutDesktop(props: HomeLayoutProps) {
  const { surveyPath, children } = props;

  return (
    <VStack height="full">
      <HStack width="full" align="center" justify="space-between" px={[3, 3, 5]} py={3}>
        <NextLink href="/" passHref>
          <Link>
            <Logo />
          </Link>
        </NextLink>
        <HStack>
          <NextLink href={surveyPath} passHref>
            <Button
              as="a"
              colorScheme="primary"
              variant="ghost"
              aria-label="Lancer le questionnaire"
            >
              Questionnaire
            </Button>
          </NextLink>

          <MenuLinks />

          <Flex align="center" marginLeft="8px">
            <ColorModeSwitch />
          </Flex>
        </HStack>
      </HStack>
      {children}
    </VStack>
  );
}
