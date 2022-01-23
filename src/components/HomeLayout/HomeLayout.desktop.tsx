import { ReactNode } from 'react';
import { Flex, Button, Image, Link, VStack, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MenuLinks } from '../MenuLinks';
import { ColorModeSwitch } from '../ColorModeSwitch';

interface HomeLayoutProps {
  surveyPath: string;
  children: ReactNode;
}

export function HomeLayoutDesktop(props: HomeLayoutProps) {
  const { surveyPath, children } = props;

  return (
    <VStack>
      <HStack width="full" align="center" justify="space-between" px={[3, 3, 5]} py={3}>
        <NextLink href="/" passHref>
          <Link>
            <Image src="/logo.png" alt="logo" w="64px" />
          </Link>
        </NextLink>
        <HStack>
          <NextLink href={surveyPath} passHref>
            <Button as="a" colorScheme="primary" variant="ghost" aria-label="Questionnaire">
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
