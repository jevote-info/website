import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import AnimatedEnvelop from '../components/AnimatedEnvelop';
import { useIsMobile } from '../hooks/useIsMobile';
import ChoiceUnderline from './ChoiceUnderline';

type HomeHeaderProps = {
  surveyPath: string;
};

const HomeHeader = ({ surveyPath }: HomeHeaderProps) => {
  const isMobile = useIsMobile();

  const surveyButtonColor = useColorModeValue('primary.600', 'primary.200');

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" position="relative">
      <Heading as="h1" size={isMobile ? '2xl' : '3xl'} textAlign="center" marginTop={[8, 8, 16]}>
        Élection présidentielle{' '}
        <Text as="span" style={{ whiteSpace: 'nowrap' }}>
          2022 :
        </Text>
        <br />
        qui soutient{' '}
        <Text as="span" color="secondary.500" position="relative" display="inline-block">
          vos idées
          <ChoiceUnderline />
        </Text>{' '}
        ?
      </Heading>
      <NextLink href={surveyPath} passHref>
        <Box
          className="callToAction"
          as="a"
          fontSize={isMobile ? '22px' : '40px'}
          marginTop="32px"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          borderRadius="md"
          fontWeight="semibold"
          padding={`0 ${isMobile ? '16' : '32'}px`}
          color={surveyButtonColor}
          background="transparent"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          _focus={{
            boxShadow: 'outline',
          }}
        >
          Je trouve mon candidat
          <ChevronRightIcon
            transition="all 200ms ease"
            sx={{
              '.callToAction:hover &': {
                transform: 'translateX(7px)',
              },
            }}
            mt={isMobile ? '0.5' : '1.5'}
            boxSize={isMobile ? 6 : 12}
          />
        </Box>
      </NextLink>
      <AnimatedEnvelop />
      <Heading
        as="h2"
        size={isMobile ? '2xl' : '3xl'}
        textAlign="center"
        marginTop={isMobile ? '96px' : '220px'}
        marginBottom="32px"
        padding="24px"
        position="relative"
      >
        <Image
          src="/icons/top-left-splash-effect.svg"
          position="absolute"
          width="32px"
          top="0"
          left="0"
          alt="Element décoratif"
        />
        Se{' '}
        <Text as="span" color="secondary.500">
          renseigner
        </Text>
        , c’est être sûr
        <br />
        de faire le bon{' '}
        <Text as="span" color="primary.600">
          choix
        </Text>
        <Image
          src="/icons/bottom-right-splash-effect.svg"
          position="absolute"
          width="32px"
          bottom="0"
          right="0"
          alt="Element décoratif"
        />
      </Heading>
    </Flex>
  );
};

export default HomeHeader;
