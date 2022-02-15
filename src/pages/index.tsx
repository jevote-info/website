import { Container, Flex } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import HomeBox from '../components/HomeBox';
import HomeHeader from '../components/HomeHeader';
import { HomeLayout } from '../components/HomeLayout';
import FAQ from '../components/FAQ';
import { useIsMobile } from '../hooks/useIsMobile';
import { fetchSurvey } from '../services/survey';
import SocialShare from '../components/SocialShare';

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
            <HomeHeader surveyPath={surveyPath} />
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
            <FAQ />
            <SocialShare />
          </Flex>
        </Container>
      </HomeLayout>
    </>
  );
}

export default Home;
