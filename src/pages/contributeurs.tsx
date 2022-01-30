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
        <Heading as="h1" color={titleColor} marginBottom="32px">
          Contributeurs
        </Heading>
        <Center>
          <Grid templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`} gap="16px">
            <TeamMember
              imagePath="/team-member.jpeg"
              name="Alan Chauchet"
              title="Lead Front-end Developer chez Qare"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nulla sit amet iaculis
          rhoncus. Phasellus finibus gravida congue. Proin suscipit lacus nec nisi sodales, non
          suscipit nibh condimentum. Donec sit amet risus blandit, faucibus tortor ac, pharetra
          quam. In est tellus, dignissim sed ante sit amet, luctus fringilla lacus. Donec in diam
          feugiat felis semper volutpat ac posuere nisi. Cras faucibus tellus a erat aliquet, at
          aliquet sapien lacinia. Ut id elit sit amet felis viverra porta quis non lorem. Proin
          efficitur consequat neque ac ornare. Aliquam ac lacus eget justo porttitor suscipit. Donec
          sed maximus libero, vitae volutpat erat. Duis sit amet consequat felis. Donec a mauris
          eget velit vestibulum efficitur. Pellentesque elementum porttitor libero."
              linkedInUrl="https://www.linkedin.com/in/alan-chauchet/"
            />
            <TeamMember
              imagePath="/team-member.jpeg"
              name="Jordan"
              title="Lorem ipsum dolor sit amet"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nulla sit amet iaculis
        rhoncus. Phasellus finibus gravida congue. Proin suscipit lacus nec nisi sodales, non
        suscipit nibh condimentum. Donec sit amet risus blandit, faucibus tortor ac, pharetra
        quam. In est tellus, dignissim sed ante sit amet, luctus fringilla lacus. Donec in diam
        feugiat felis semper volutpat ac posuere nisi. Cras faucibus tellus a erat aliquet, at
        aliquet sapien lacinia. Ut id elit sit amet felis viverra porta quis non lorem. Proin
        efficitur consequat neque ac ornare. Aliquam ac lacus eget justo porttitor suscipit. Donec
        sed maximus libero, vitae volutpat erat. Duis sit amet consequat felis. Donec a mauris
        eget velit vestibulum efficitur. Pellentesque elementum porttitor libero."
            />
            <TeamMember
              imagePath="/team-member.jpeg"
              name="Baptiste Acca"
              title="Software Engineer @Sorare"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nulla sit amet iaculis
        rhoncus. Phasellus finibus gravida congue. Proin suscipit lacus nec nisi sodales, non
        suscipit nibh condimentum. Donec sit amet risus blandit, faucibus tortor ac, pharetra
        quam. In est tellus, dignissim sed ante sit amet, luctus fringilla lacus. Donec in diam
        feugiat felis semper volutpat ac posuere nisi. Cras faucibus tellus a erat aliquet, at
        aliquet sapien lacinia. Ut id elit sit amet felis viverra porta quis non lorem. Proin
        efficitur consequat neque ac ornare. Aliquam ac lacus eget justo porttitor suscipit. Donec
        sed maximus libero, vitae volutpat erat. Duis sit amet consequat felis. Donec a mauris
        eget velit vestibulum efficitur. Pellentesque elementum porttitor libero."
              linkedInUrl="https://www.linkedin.com/in/baptisteacca/"
            />
            <TeamMember
              imagePath="/team-member.jpeg"
              name="Julie Rosin"
              title="Chargée de communication chez Artivisor, les bonnes adresses artisanales à Nantes"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nulla sit amet iaculis
        rhoncus. Phasellus finibus gravida congue. Proin suscipit lacus nec nisi sodales, non
        suscipit nibh condimentum. Donec sit amet risus blandit, faucibus tortor ac, pharetra
        quam. In est tellus, dignissim sed ante sit amet, luctus fringilla lacus. Donec in diam
        feugiat felis semper volutpat ac posuere nisi. Cras faucibus tellus a erat aliquet, at
        aliquet sapien lacinia. Ut id elit sit amet felis viverra porta quis non lorem. Proin
        efficitur consequat neque ac ornare. Aliquam ac lacus eget justo porttitor suscipit. Donec
        sed maximus libero, vitae volutpat erat. Duis sit amet consequat felis. Donec a mauris
        eget velit vestibulum efficitur. Pellentesque elementum porttitor libero."
              linkedInUrl="https://www.linkedin.com/in/julie-rosin/"
            />
            <TeamMember
              imagePath="/simon-galet.jpeg"
              name="Simon Galet"
              title="CEO @theTribe Mobile"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nulla sit amet iaculis
        rhoncus. Phasellus finibus gravida congue. Proin suscipit lacus nec nisi sodales, non
        suscipit nibh condimentum. Donec sit amet risus blandit, faucibus tortor ac, pharetra
        quam. In est tellus, dignissim sed ante sit amet, luctus fringilla lacus. Donec in diam
        feugiat felis semper volutpat ac posuere nisi. Cras faucibus tellus a erat aliquet, at
        aliquet sapien lacinia. Ut id elit sit amet felis viverra porta quis non lorem. Proin
        efficitur consequat neque ac ornare. Aliquam ac lacus eget justo porttitor suscipit. Donec
        sed maximus libero, vitae volutpat erat. Duis sit amet consequat felis. Donec a mauris
        eget velit vestibulum efficitur. Pellentesque elementum porttitor libero."
              linkedInUrl="https://www.linkedin.com/in/simongalet/"
            />
            <TeamMember
              imagePath="/team-member.jpeg"
              name="Florian Jeudi"
              title="Lorem ipsum dolor sit amet"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nulla sit amet iaculis
        rhoncus. Phasellus finibus gravida congue. Proin suscipit lacus nec nisi sodales, non
        suscipit nibh condimentum. Donec sit amet risus blandit, faucibus tortor ac, pharetra
        quam. In est tellus, dignissim sed ante sit amet, luctus fringilla lacus. Donec in diam
        feugiat felis semper volutpat ac posuere nisi. Cras faucibus tellus a erat aliquet, at
        aliquet sapien lacinia. Ut id elit sit amet felis viverra porta quis non lorem. Proin
        efficitur consequat neque ac ornare. Aliquam ac lacus eget justo porttitor suscipit. Donec
        sed maximus libero, vitae volutpat erat. Duis sit amet consequat felis. Donec a mauris
        eget velit vestibulum efficitur. Pellentesque elementum porttitor libero."
            />
            <TeamMember
              imagePath="/team-member.jpeg"
              name="Guillaume Acca"
              title="Lorem ipsum dolor sit amet"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nulla sit amet iaculis
        rhoncus. Phasellus finibus gravida congue. Proin suscipit lacus nec nisi sodales, non
        suscipit nibh condimentum. Donec sit amet risus blandit, faucibus tortor ac, pharetra
        quam. In est tellus, dignissim sed ante sit amet, luctus fringilla lacus. Donec in diam
        feugiat felis semper volutpat ac posuere nisi. Cras faucibus tellus a erat aliquet, at
        aliquet sapien lacinia. Ut id elit sit amet felis viverra porta quis non lorem. Proin
        efficitur consequat neque ac ornare. Aliquam ac lacus eget justo porttitor suscipit. Donec
        sed maximus libero, vitae volutpat erat. Duis sit amet consequat felis. Donec a mauris
        eget velit vestibulum efficitur. Pellentesque elementum porttitor libero."
            />
          </Grid>
        </Center>
      </Container>
    </HomeLayout>
  );
};

export default Team;
