import { Box, Link as ChakraLink, Button, Container, Heading } from '@chakra-ui/react';
import Link from 'next/link';

export default function Other() {
  return (
    <Box h="full">
      <Container
        h="full"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap={4}
      >
        <Heading size="xl">This is Other</Heading>
        <ChakraLink as={Link} href="/">
          <Button variant="teal">Go Home</Button>
        </ChakraLink>
      </Container>
    </Box>
  );
}
