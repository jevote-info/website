import { Box, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react';

export function EmptyPodium() {
  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      px={5}
    >
      <VStack width="full" flex={1} justifyContent="center">
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
    </Container>
  );
}
