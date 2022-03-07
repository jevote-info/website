import {
  Button,
  Container,
  Heading,
  usePrefersReducedMotion,
  useToken,
  VStack,
  Center,
  Text,
  Link,
  keyframes,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Politician } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { Podium } from '../Podium/Podium';
import { EmptyPodium } from '../EmptyPodium';

interface PoliticiansPodiumHeroProps {
  politicians: Politician[];
  hasPositiveScores: boolean;
  onSharingModalOpen: () => void;
}

const move = keyframes`
  0% {transform: translateY(0px);}
  50% {transform: translateY(4px)}
  100% {transform: translateY(0px)}
`;

export function PoliticiansPodiumHero(props: PoliticiansPodiumHeroProps) {
  const { politicians, hasPositiveScores, onSharingModalOpen } = props;

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
        {hasPositiveScores ? (
          <Podium politicians={politicians} variant="normal" />
        ) : (
          <EmptyPodium />
        )}
      </VStack>
      <Center mt="3">
        <Button
          colorScheme="primary"
          onClick={onSharingModalOpen}
          leftIcon={<FontAwesomeIcon width={16} icon={faShare} />}
        >
          Partager mes résultats
        </Button>
      </Center>
      <VStack as={Link} alignItems="center" p={5} spacing={0} href={`#graphique`}>
        <Text>Faites défiler pour plus de détails</Text>
        <ChevronDownIcon animation={`${move} infinite 2s ease`} fontSize={30} />
      </VStack>
    </Container>
  );
}
