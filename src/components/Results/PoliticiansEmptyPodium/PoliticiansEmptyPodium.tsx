import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  keyframes,
  Link,
  Center,
} from '@chakra-ui/react';

interface PoliticiansEmptyPodiumProps {
  nextSectionId: string;
}

const move = keyframes`
  0% {transform: translateY(0px);}
  50% {transform: translateY(4px)}
  100% {transform: translateY(0px)}
`;

export function PoliticiansEmptyPodium(props: PoliticiansEmptyPodiumProps) {
  const { nextSectionId } = props;

  return (
    <Container
      minHeight="calc(100vh - 64px)"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      px={5}
    >
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
            <Text fontWeight="bold" align="center" color="primary.200" fontSize="md">
              ?
            </Text>
            <Box
              width="full"
              height="10vh"
              bgColor="primary.200"
              borderTopRadius="lg"
              position="relative"
            />
          </VStack>
          <VStack flex={1} height="full" justify="flex-end">
            <Text fontWeight="bold" align="center" color="primary.500" fontSize="lg">
              ?
            </Text>
            <Box
              width="full"
              height="10vh"
              bgColor="primary.500"
              borderTopRadius="lg"
              position="relative"
            />
          </VStack>
          <VStack flex={1} height="full" justify="flex-end">
            <Text fontWeight="bold" align="center" color="secondary.500" fontSize="md">
              ?
            </Text>
            <Box
              width="full"
              height="10vh"
              bgColor="secondary.500"
              borderTopRadius="lg"
              position="relative"
            />
          </VStack>
        </HStack>
        <Heading>Il semblerait qu&apos;aucun des candidats ne corresponde à vos idées</Heading>
      </VStack>
      <VStack as={Link} alignItems="center" p={5} spacing={0} href={`#${nextSectionId}`}>
        <Text>Faites défiler pour plus de détails</Text>
        <ChevronDownIcon animation={`${move} infinite 2s ease`} fontSize={30} />
      </VStack>
    </Container>
  );
}
