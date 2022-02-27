import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import AnimatedEnvelop from '../components/AnimatedEnvelop';
import { useIsMobile } from '../hooks/useIsMobile';

type HomeHeaderProps = {
  surveyPath: string;
};

const HomeHeader = ({ surveyPath }: HomeHeaderProps) => {
  const isMobile = useIsMobile();

  const surveyButtonColor = useColorModeValue('primary.600', 'primary.200');
  const surveyButtonaHoverBackground = useColorModeValue('primary.50', 'rgba(167, 172, 224, 0.12)');
  const surveyButtonaActiveBackground = useColorModeValue(
    'primary.100',
    'rgba(167, 172, 224, 0.24)',
  );

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" position="relative">
      <Heading as="h1" size={isMobile ? '2xl' : '3xl'} textAlign="center" marginTop={[8, 8, 16]}>
        Se{' '}
        <Text as="span" color="secondary.500">
          renseigner
        </Text>
        , c’est être sûr de faire le bon choix
      </Heading>
      <NextLink href={surveyPath} passHref>
        <Box
          as="a"
          fontSize={isMobile ? '30px' : '40px'}
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
      <Heading
        as="h2"
        size={isMobile ? '2xl' : '3xl'}
        textAlign="center"
        marginTop="64px"
        marginBottom="32px"
      >
        Une application{' '}
        <Text as="span" color="secondary.500">
          citoyenne
        </Text>
        , pour{' '}
        <Text as="span" color="primary.600">
          citoyens
        </Text>
      </Heading>
    </Flex>
  );
};

export default HomeHeader;
