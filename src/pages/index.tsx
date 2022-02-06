import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Container, Heading, Text, useColorModeValue, Flex } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import HomeBox from '../components/HomeBox';
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
  const { surveyPath } = props;

  const isMobile = useIsMobile();
  const surveyButtonColor = useColorModeValue('primary.600', 'primary.200');
  const surveyButtonaHoverBackground = useColorModeValue('primary.50', 'rgba(167, 172, 224, 0.12)');
  const surveyButtonaActiveBackground = useColorModeValue(
    'primary.100',
    'rgba(167, 172, 224, 0.24)',
  );

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
        <Container h="full" maxW="container.lg">
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Heading as="h1" size="3xl" textAlign="center" marginTop="64px">
              Et vous ? Pour qui allez vous{' '}
              <Text as="span" color="secondary.500">
                voter
              </Text>{' '}
              le 10 avril prochain ?
            </Heading>
            <NextLink href={surveyPath} passHref>
              <Box
                as="a"
                fontSize="40px"
                marginTop="32px"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                borderRadius="md"
                fontWeight="semibold"
                padding="0 32px"
                color={surveyButtonColor}
                background="transparent"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ background: surveyButtonaHoverBackground }}
                _active={{
                  background: surveyButtonaActiveBackground,
                }}
                _focus={{
                  boxShadow: 'outline',
                }}
              >
                Je trouve mon candidat
                <ChevronRightIcon width="48px" height="48px" />
              </Box>
            </NextLink>
            <Heading as="h2" size="3xl" textAlign="center" marginTop="64px">
              Une application{' '}
              <Text as="span" color="secondary.500">
                citoyenne
              </Text>
              , pour{' '}
              <Text as="span" color="primary.900">
                citoyens
              </Text>{' '}
              engagés.
            </Heading>
            <HomeBox
              title="Trouvez votre candidat, sans parcourir les programmes"
              description="Suspendisse dui enim, tempus volutpat cursus in, lobortis et massa. Mauris maximus
          convallis vestibulum. Sed commodo, risus et laoreet commodo, enim mauris commodo felis, ac
          auctor diam orci id nisl. Donec tristique finibus mi sed pretium. Ut condimentum nulla
          diam, vel placerat ante posuere eget. In nec posuere mauris. Donec tristique finibus mi
          sed pretium. Ut condimentum nulla diam."
              imagePath="/people.png"
              isSmall={isMobile}
            />
            <Flex direction={isMobile ? 'column' : 'row'}>
              <HomeBox
                title="Aucune donnée stockée, restez incognito."
                description="Suspendisse dui enim, tempus volutpat cursus in, lobortis et massa. Mauris maximus convallis vestibulum. Sed commodo, risus et laoreet commodo, enim mauris commodo felis, ac auctor diam orci id nisl. Donec tristique finibus mi sed pretium."
                imagePath="/lock.png"
                isSmall
              />
              <HomeBox
                title="Votez utile, contre l’abstention."
                description="Suspendisse dui enim, tempus volutpat cursus in, lobortis et massa. Mauris maximus convallis vestibulum. Sed commodo, risus et laoreet commodo, enim mauris commodo felis, ac auctor diam orci id nisl. Donec tristique finibus mi sed pretium."
                imagePath="/vote.png"
                isSmall
                isImageFirst
              />
            </Flex>
          </Flex>
        </Container>
      </HomeLayout>
    </>
  );
}

export default Home;
