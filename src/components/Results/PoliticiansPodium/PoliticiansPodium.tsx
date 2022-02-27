import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  usePrefersReducedMotion,
  useToken,
  VStack,
  keyframes,
  Link,
  Center,
} from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import Image from 'next/image';
import Confetti from 'react-confetti';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { PoliticianPicture } from '../PoliticianPicture';
import firstPlaceMedal from './images/1st-place-medal.png';
import secondPlaceMedal from './images/2nd-place-medal.png';
import thirdPlaceMedal from './images/3rd-place-medal.png';

interface PoliticiansPodiumProps {
  politicians: Politician[];
  nextSectionId: string;
}

const move = keyframes`
  0% {transform: translateY(0px);}
  50% {transform: translateY(4px)}
  100% {transform: translateY(0px)}
`;

export function PoliticiansPodium(props: PoliticiansPodiumProps) {
  const { politicians, nextSectionId } = props;

  const { width, height } = useWindowSize();
  const prefersReducedMotion = usePrefersReducedMotion();

  const colors = useToken('colors', [
    'primary.50',
    'primary.100',
    'primary.200',
    'primary.300',
    'primary.400',
    'primary.500',
    'secondary.50',
    'secondary.100',
    'secondary.200',
    'secondary.300',
    'secondary.400',
    'secondary.500',
  ]);

  return (
    <Container
      minHeight="calc(100vh - 64px)"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      px={5}
    >
      {!prefersReducedMotion && width && height && (
        <>
          <Confetti
            confettiSource={{ x: (10 / 100) * width, y: height - (10 / 100) * height, w: 0, h: 0 }}
            initialVelocityX={10}
            initialVelocityY={20}
            numberOfPieces={100}
            colors={colors}
            recycle={false}
          />
          <Confetti
            confettiSource={{
              x: width - (10 / 100) * width,
              y: height - (10 / 100) * height,
              w: 0,
              h: 0,
            }}
            initialVelocityX={10}
            initialVelocityY={20}
            numberOfPieces={100}
            colors={colors}
            recycle={false}
          />
        </>
      )}
      <VStack width="full" flex={1} justifyContent="center">
        <Center>
          <Heading as="h1" mb={[5, 10]}>
            Vos résultats
          </Heading>
        </Center>
        <HStack
          align="flex-end"
          justify="space-between"
          spacing={5}
          width="full"
          borderBottomRadius={8}
          borderBottomColor="primary.500"
          borderBottomWidth={5}
          borderBottomStyle="solid"
        >
          <VStack flex={1} justify="flex-end">
            <PoliticianPicture politician={politicians[1]} size="medium" />
            <Text fontWeight="bold" align="center" color="primary.200" fontSize="md">
              {politicians[1].name}
            </Text>
            <Box
              width="full"
              height="23vh"
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
          <VStack flex={1} height="full" justify="flex-end">
            <PoliticianPicture politician={politicians[0]} size="medium" />
            <Text fontWeight="bold" align="center" color="primary.500" fontSize="lg">
              {politicians[0].name}
            </Text>
            <Box
              width="full"
              height="42vh"
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
            <PoliticianPicture politician={politicians[2]} size="medium" />
            <Text fontWeight="bold" align="center" color="secondary.500" fontSize="md">
              {politicians[2].name}
            </Text>
            <Box
              width="full"
              height="12vh"
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
      </VStack>
      <VStack as={Link} alignItems="center" p={5} spacing={0} href={`#${nextSectionId}`}>
        <Text>Faites défiler pour plus de détails</Text>
        <ChevronDownIcon animation={`${move} infinite 2s ease`} fontSize={30} />
      </VStack>
    </Container>
  );
}
