import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { Politician } from '@prisma/client';
import { PoliticianPicture } from '../PoliticianPicture';
import { ImageSharingVariant } from '../../../types/surveyResult';
import firstPlaceMedal from './images/1st-place-medal.png';
import secondPlaceMedal from './images/2nd-place-medal.png';
import thirdPlaceMedal from './images/3rd-place-medal.png';

type PodiumVariant = 'normal' | ImageSharingVariant;
interface PodiumProps {
  politicians: Politician[];
  variant: PodiumVariant;
  withPictures?: boolean;
}

export function Podium(props: PodiumProps) {
  const { politicians, variant, withPictures = true } = props;

  const fontSizes = {
    normal: {
      winner: 'xl',
      runnerUps: 'lg',
    },
    story: {
      winner: '42px',
      runnerUps: '32px',
    },
    post: {
      winner: '42px',
      runnerUps: '32px',
    },
  };
  const podiumSizes: Record<PodiumVariant, { winner: string; second: string; third: string }> = {
    normal: {
      winner: '42vh',
      second: '23vh',
      third: '13vh',
    },
    story: {
      winner: '80%',
      second: '45%',
      third: '20%',
    },
    post: {
      winner: '90%',
      second: '65%',
      third: '35%',
    },
  };

  return (
    <HStack
      align="flex-end"
      justify="space-between"
      spacing={5}
      width="full"
      height="full"
      borderBottomRadius={8}
      borderBottomColor="primary.500"
      borderBottomWidth={5}
      borderBottomStyle="solid"
    >
      <VStack flex={1} justify="flex-end" height="full">
        {withPictures && <PoliticianPicture politician={politicians[1]} />}
        <Text
          fontWeight="bold"
          align="center"
          color="primary.200"
          fontSize={fontSizes[variant].runnerUps}
        >
          {politicians[1].name}
        </Text>
        <Box
          mt={variant === 'normal' ? '0' : '42px !important'}
          width="full"
          minHeight={podiumSizes[variant].second}
          bgColor="primary.200"
          borderTopRadius="lg"
          position="relative"
        >
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            alignItems="start"
            justifyContent="center"
          >
            <Image src={secondPlaceMedal} alt="Deuxième place" width={50} height={50} />
          </Flex>
        </Box>
      </VStack>
      <VStack
        flex={1}
        height="full"
        justify="flex-end"
        maxWidth={variant === 'normal' ? undefined : '33%'}
      >
        {withPictures && <PoliticianPicture politician={politicians[0]} />}
        <Text
          fontWeight="bold"
          align="center"
          color="primary.500"
          fontSize={fontSizes[variant].winner}
          style={variant === 'normal' ? {} : { whiteSpace: 'nowrap' }}
        >
          {politicians[0].name}
        </Text>
        <Box
          mt={variant === 'normal' ? '0' : '42px !important'}
          width="full"
          minHeight={podiumSizes[variant].winner}
          bgColor="primary.500"
          borderTopRadius="lg"
          position="relative"
        >
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            alignItems="start"
            justifyContent="center"
          >
            <Image src={firstPlaceMedal} alt="Première place" width={50} height={50} />
          </Flex>
        </Box>
      </VStack>
      <VStack flex={1} height="full" justify="flex-end">
        {withPictures && <PoliticianPicture politician={politicians[2]} />}
        <Text
          fontWeight="bold"
          align="center"
          color="secondary.500"
          fontSize={fontSizes[variant].runnerUps}
        >
          {politicians[2].name}
        </Text>
        <Box
          mt={variant === 'normal' ? '0' : '42px !important'}
          width="full"
          minHeight={podiumSizes[variant].third}
          bgColor="secondary.500"
          borderTopRadius="lg"
          position="relative"
        >
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            alignItems="start"
            justifyContent="center"
          >
            <Image src={thirdPlaceMedal} alt="Troisième place" width={50} height={50} />
          </Flex>
        </Box>
      </VStack>
    </HStack>
  );
}
