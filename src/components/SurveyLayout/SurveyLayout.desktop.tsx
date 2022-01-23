import { Image, VStack, HStack, Flex, Link, Grid } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Survey from '../../types/survey';
import { CategoryItem } from './CategoryItem';
import NextLink from 'next/link';
import { MenuLinks } from '../MenuLinks';
import { ColorModeSwitch } from '../ColorModeSwitch';

interface SurveyLayoutProps {
  survey: Survey;
  currentCategory: Survey[number];
  children: ReactNode;
}

export function SurveyLayoutDesktop(props: SurveyLayoutProps) {
  const { survey, currentCategory, children } = props;

  return (
    <VStack height="full" align="start">
      <HStack width="full" align="center" justify="space-between" px={[3, 3, 5]} py={3}>
        <NextLink href="/" passHref>
          <Link>
            <Image src="/logo.png" alt="logo" w="64px" />
          </Link>
        </NextLink>
        <HStack>
          <MenuLinks />

          <Flex align="center" marginLeft="8px">
            <ColorModeSwitch />
          </Flex>
        </HStack>
      </HStack>
      <Grid width="full" height="full" templateColumns="auto 1fr">
        <VStack p={5} alignItems="start" spacing={3}>
          {survey.map(category => (
            <CategoryItem
              key={category.id}
              category={category}
              isActive={category.id === currentCategory.id}
            />
          ))}
        </VStack>
        <Flex
          flexDirection="column"
          flex={1}
          alignItems="center"
          p={5}
          height="full"
          position="relative"
        >
          {children}
        </Flex>
      </Grid>
    </VStack>
  );
}
