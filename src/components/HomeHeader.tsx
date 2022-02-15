import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import AnimatedEnvelop from '../components/AnimatedEnvelop';

type HomeHeaderProps = {
  surveyPath: string;
};

const HomeHeader = ({ surveyPath }: HomeHeaderProps) => {
  const surveyButtonColor = useColorModeValue('primary.600', 'primary.200');
  const surveyButtonaHoverBackground = useColorModeValue('primary.50', 'rgba(167, 172, 224, 0.12)');
  const surveyButtonaActiveBackground = useColorModeValue(
    'primary.100',
    'rgba(167, 172, 224, 0.24)',
  );

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" position="relative">
      <Heading as="h1" size="3xl" textAlign="center" marginTop="64px">
        Et vous ? Pour qui allez vous{' '}
        <Text as="span" color="secondary.500">
          voter
        </Text>{' '}
        le 10 avril prochain ?
      </Heading>
      <NextLink href={surveyPath} passHref>
        <Box
          as="a"
          fontSize="40px"
          marginTop="32px"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          borderRadius="md"
          fontWeight="semibold"
          padding="0 32px"
          color={surveyButtonColor}
          background="transparent"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ background: surveyButtonaHoverBackground }}
          _active={{
            background: surveyButtonaActiveBackground,
          }}
          _focus={{
            boxShadow: 'outline',
          }}
        >
          Je trouve mon candidat
          <ChevronRightIcon width="48px" height="48px" />
        </Box>
      </NextLink>
      <AnimatedEnvelop />
      <Heading as="h2" size="3xl" textAlign="center" marginTop="64px" marginBottom="32px">
        Une application{' '}
        <Text as="span" color="secondary.500">
          citoyenne
        </Text>
        , pour{' '}
        <Text as="span" color="primary.600">
          citoyens
        </Text>{' '}
        engagés.
      </Heading>
    </Flex>
  );
};

export default HomeHeader;
