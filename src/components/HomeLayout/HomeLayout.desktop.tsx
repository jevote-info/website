import { ReactNode } from 'react';
import { Box, Flex, Link, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MenuLinks } from '../MenuLinks';
import { ColorModeSwitch } from '../ColorModeSwitch';
import { Logo } from '../Logo';
import HomeFooter from './HomeFooter';

interface HomeLayoutProps {
  surveyPath: string;
  children: ReactNode;
}

export function HomeLayoutDesktop(props: HomeLayoutProps) {
  const { surveyPath, children } = props;

  return (
    <Box height="full">
      <HStack width="full" align="center" justify="space-between" px={[3, 3, 5]} py={3}>
        <NextLink href="/" passHref>
          <Link _hover={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
        </NextLink>
        <HStack>
          <MenuLinks withSurveyLink surveyPath={surveyPath} />

          <Flex align="center" marginLeft="8px">
            <ColorModeSwitch />
          </Flex>
        </HStack>
      </HStack>
      <Box flex="1">{children}</Box>
      <HomeFooter surveyPath={surveyPath} />
    </Box>
  );
}
