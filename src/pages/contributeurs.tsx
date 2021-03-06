import { Center, Container, Heading, Grid, Text } from '@chakra-ui/react';
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
      </Head>
      <HomeLayout surveyPath={surveyPath}>
        <Container maxW="container.xl">
          <Heading as="h1" color={titleColor} margin="64px 0 16px 0" textAlign="center">
            Contributeurs
          </Heading>
          <Text as="p" marginBottom="64px" align="center">
            Le projet jevote.info repose sur l&apos;engagement citoyen de ses contributeurs.
            <br />
            Nous ne sommes affiliés à aucun parti, aucune entreprise, aucune organisation, et nous
            ne promouvons aucun candidat.
            <br />
            Par ailleurs, ce projet est réalisé sur notre temps personnel et n&apos;engage en aucun
            cas la responsabilité de nos employeurs respectifs, qui ne contribuent aucunement à ce
            projet.
          </Text>
          <Center>
            <Grid templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`} gap="16px">
              <TeamMember
                imagePath="/team/alan-chauchet.jpeg"
                name="Alan"
                description=""
                linkedInUrl="https://www.linkedin.com/in/alan-chauchet/"
              />
              <TeamMember
                imagePath="/team/jordan-berndt.png"
                name="Jordan"
                description=""
                linkedInUrl="https://www.linkedin.com/in/jordan-berndt-921046145"
                dribbbleUrl="https://dribbble.com/JordanBrnt"
              />
              <TeamMember
                imagePath="/team/baptiste-acca.jpeg"
                name="Baptiste"
                description=""
                linkedInUrl="https://www.linkedin.com/in/baptisteacca/"
                twitterUrl="https://twitter.com/eulbat"
              />
              <TeamMember imagePath="/team/julie.jpeg" name="Julie" title="" description="" />
              <TeamMember
                imagePath="/team/simon-galet.jpeg"
                name="Simon"
                title=""
                description=""
                linkedInUrl="https://www.linkedin.com/in/simongalet/"
              />
              <TeamMember imagePath="/team/florian-jeudi.jpeg" name="Florian" description="" />
              <TeamMember
                imagePath="/team/guillaume-acca.JPG"
                name="Guillaume"
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
