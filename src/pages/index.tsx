import { Box, Container, Heading } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { HomeLayout } from '../components/HomeLayout';
import { fetchSurvey } from '../services/survey';

interface HomeProps {
  surveyPath: string;
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ preview = false }) => {
  const survey = await fetchSurvey({ previewMode: preview });
  const firstCategory = survey[0];
  const firstQuestion = firstCategory.questions[0];

  return {
    props: {
      surveyPath: `/categories/${firstCategory.slug}/questions/${firstQuestion.order}`,
    },
  };
};

function Home(props: HomeProps) {
  const { surveyPath } = props;

  return (
    <>
      <Head>
        <title>JeVote</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout surveyPath={surveyPath}>
        <Box w="100%">
          <Container
            h="full"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            rowGap={4}
          >
            <Heading _hover={{ fontSize: 44 }} transition="all 200ms ease">
              Accueil
            </Heading>
          </Container>
        </Box>
      </HomeLayout>
    </>
  );
}

export default Home;
