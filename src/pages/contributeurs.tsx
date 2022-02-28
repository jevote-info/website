import { Center, Container, Heading, Grid } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { HomeLayout } from '../components/HomeLayout';
import TeamMember from '../components/TeamMember';
import { useIsMobile } from '../hooks/useIsMobile';
import usePrimaryColorModeValue from '../hooks/usePrimaryColorModeValue';
import { fetchSurvey } from '../services/survey';

interface TeamProps {
  surveyPath: string;
}

export const getStaticProps: GetStaticProps<TeamProps> = async ({ preview = false }) => {
  const survey = await fetchSurvey({ previewMode: preview });
  const firstCategory = survey[0];
  const firstQuestion = firstCategory.questions[0];

  return {
    props: {
      surveyPath: `/categories/${firstCategory.slug}/questions/${firstQuestion.order}`,
    },
  };
};

const Team = ({ surveyPath }: TeamProps) => {
  const titleColor = usePrimaryColorModeValue();
  const isMobile = useIsMobile();

  return (
    <>
      <Head>
        <title>jevote.info - Contributeurs</title>
        <meta
          name="description"
          content="Découvrez quel candidat(e) est le plus proche de vos convictions grace à un questionnaire sur les programmes des candidats"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout surveyPath={surveyPath}>
        <Container maxW="container.xl">
          <Heading as="h1" color={titleColor} margin="64px 0 32px 0">
            Contributeurs
          </Heading>
          <Center>
            <Grid templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`} gap="16px">
              <TeamMember
                imagePath="/team/alan-chauchet.jpeg"
                name="Alan Chauchet"
                description=""
                linkedInUrl="https://www.linkedin.com/in/alan-chauchet/"
              />
              <TeamMember
                imagePath="/team/jordan-berndt.png"
                name="Jordan Berndt"
                description=""
                linkedInUrl="https://www.linkedin.com/in/jordan-berndt-921046145"
              />
              <TeamMember
                imagePath="/team/baptiste-acca.jpeg"
                name="Baptiste Acca"
                description=""
                linkedInUrl="https://www.linkedin.com/in/baptisteacca/"
              />
              <TeamMember
                imagePath="/team/julie.jpeg"
                name="Julie"
                title="Chargée de communication chez Artivisor, les bonnes adresses artisanales à Nantes"
                description=""
                linkedInUrl="https://www.linkedin.com/in/julie/"
              />
              <TeamMember
                imagePath="/team/simon-galet.jpeg"
                name="Simon Galet"
                title="CEO @theTribe Mobile"
                description=""
                linkedInUrl="https://www.linkedin.com/in/simongalet/"
              />
              <TeamMember
                imagePath="/team/florian-jeudi.jpeg"
                name="Florian Jeudi"
                description=""
              />
              <TeamMember
                imagePath="/team/guillaume-acca.JPG"
                name="Guillaume Acca"
                description=""
                linkedInUrl="https://www.linkedin.com/in/guillaume-acca-649a26222/"
              />
            </Grid>
          </Center>
        </Container>
      </HomeLayout>
    </>
  );
};

export default Team;
