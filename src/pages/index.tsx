import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { HomeLayout } from '../components/HomeLayout';
import { useIsMobile } from '../hooks/useIsMobile';
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
  const isMobile = useIsMobile();
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
        <Container h="full" maxW="container.xl">
          <Box
            position="relative"
            overflow="hidden"
            backgroundImage="/home-banner.jpeg"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            width="100%"
            height={0}
            paddingTop="66.67%"
            borderRadius="lg"
          >
            <Box
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              alignItems="center"
              padding={isMobile ? '16px' : '32px'}
            >
              <Heading
                as="h1"
                size="lg"
                textAlign="center"
                color="primary.200"
                marginLeft="128px"
                marginRight="128px"
                marginBottom="32px"
              >
                Magnifique phrase d&apos;accroche
              </Heading>
              <NextLink href={surveyPath} passHref>
                <Button
                  as="a"
                  backgroundColor="primary.200"
                  color="black"
                  aria-label="Lancer le questionnaire"
                >
                  Lancer le questionnaire
                </Button>
              </NextLink>
            </Box>
          </Box>
        </Container>
      </HomeLayout>
    </>
  );
}

export default Home;
