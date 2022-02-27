import { Center, Container, Heading, Grid } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
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
    <HomeLayout surveyPath={surveyPath}>
      <Container maxW="container.xl">
        <Heading as="h1" color={titleColor} margin="64px 0 32px 0">
          Contributeurs
        </Heading>
        <Center>
          <Grid templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`} gap="16px">
            <TeamMember
              name="Alan Chauchet"
              title="Lead Front-end Developer chez Qare"
              description="A remplir"
              linkedInUrl="https://www.linkedin.com/in/alan-chauchet/"
            />
            <TeamMember name="Jordan" title="A remplir" description="A remplir" />
            <TeamMember
              name="Baptiste Acca"
              title="Software Engineer @Sorare"
              description="A remplir"
              linkedInUrl="https://www.linkedin.com/in/baptisteacca/"
            />
            <TeamMember
              imagePath="/team/julie.jpeg"
              name="Julie"
              title="Chargée de communication chez Artivisor, les bonnes adresses artisanales à Nantes"
              description="A remplir"
              linkedInUrl="https://www.linkedin.com/in/julie/"
            />
            <TeamMember
              imagePath="/team/simon-galet.jpeg"
              name="Simon Galet"
              title="CEO @theTribe Mobile"
              description="A remplir"
              linkedInUrl="https://www.linkedin.com/in/simongalet/"
            />
            <TeamMember name="Florian Jeudi" title="A remplir" description="A remplir" />
            <TeamMember
              name="Guillaume Acca"
              title="Lorem ipsum dolor sit amet"
              description="A remplir"
            />
          </Grid>
        </Center>
      </Container>
    </HomeLayout>
  );
};

export default Team;
