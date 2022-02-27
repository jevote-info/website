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
              title="Nous analysons les programmes, vous trouvez votre candidat"
              description="Jevote.info est un questionnaire rapide, intuitif et complet qui a pour principal but d’intéresser et d’engager les citoyens à l’aube de cette élection présidentielle française. Nous avons parcouru, analysé et implémenté dans notre questionnaire les programmes des candidats à l’élection."
              imagePath="/people.png"
              isSmall={isMobile}
            />
            <Flex direction={isMobile ? 'column' : 'row'}>
              <HomeBox
                title="Aucune donnée personnelle stockée, restez incognito"
                description="Sur jevote.info, aucune donnée personnelle n’est enregistrée et vos réponses sont totalement anonymes. À des fins de transparence, l’ensemble du code du site, algorithme compris, est disponible en ligne (open source)."
                imagePath="/lock.png"
                isSmall
              />
              <HomeBox
                title="Votez pour vos idées"
                description="Nos objectifs ? Pallier certains maux de la société qui n’ont cessé de croître ces dernières années : un désintéressement de la politique et un taux d’abstention élevé (22,23% au premier tour en 2017). À travers jevote.info, nous souhaitons rendre la politique accessible à tous les citoyens, lutter contre l'abstention et favoriser l’engagement de chacun."
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
