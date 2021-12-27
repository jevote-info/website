import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Link as ChakraLink,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo } from 'react';
import superjson from 'superjson';
import { fetchSurvey } from '../services/survey';
import { useSurveyStore } from '../stores/survey';
import { Survey } from '../types/survey';

interface SerialiazedHomeProps {
  survey: string;
}

export const getStaticProps: GetStaticProps<SerialiazedHomeProps> = async context => {
  const { preview = false } = context;

  const survey = await fetchSurvey({ previewMode: preview });

  return {
    props: {
      survey: superjson.stringify(survey),
    },
  };
};

const Home = (serializedProps: SerialiazedHomeProps) => {
  const survey = useMemo(
    () => superjson.parse<Survey>(serializedProps.survey),
    [serializedProps.survey],
  );

  const surveyStore = useSurveyStore();

  return (
    <Box h="full">
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
          This is using{' '}
          <Text as="span" color="teal.400" decoration="underline">
            Chakra-UI
          </Text>
        </Heading>
        <ChakraLink as={Link} href="/other">
          <Button>Go to other</Button>
        </ChakraLink>
        <ButtonGroup isAttached>
          <Button colorScheme="orange" onClick={surveyStore.increasePopulation}>
            Increment {surveyStore.bears}
          </Button>
          <Button colorScheme="red" onClick={surveyStore.removeAllBears}>
            Reset
          </Button>
        </ButtonGroup>
        <Heading size="md" as="h2">
          We have some crazy categories
        </Heading>
        <UnorderedList>
          {survey.map(category => (
            <ListItem key={category.id}>
              <ChakraLink as={Link} href={`/categorie/${category.slug}`}>
                {category.title}
              </ChakraLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
    </Box>
  );
};

export default Home;
