import { Box, Container, Heading } from '@chakra-ui/react';
import Head from 'next/head';

const Home = () => {
  return (
    <Box w="100%">
      <Head>
        <title>JeVote</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        h="full"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap={4}
      >
        <Heading _hover={{ fontSize: 44 }} transition="all 200ms ease">
          Home
        </Heading>
      </Container>
    </Box>
  );
};

export default Home;
