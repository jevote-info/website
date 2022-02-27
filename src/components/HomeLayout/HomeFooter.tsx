import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { MenuLinks } from '../MenuLinks';

type HomeFooterProps = {
  surveyPath: string;
};

const HomeFooter = ({ surveyPath }: HomeFooterProps) => {
  const isMobile = useIsMobile();

  const now = new Date(Date.now());
  const electionDate = new Date('04/10/2022');
  const differenceInTime = electionDate.getTime() - now.getTime();
  const differenceInDay = Math.round(differenceInTime / (1000 * 3600 * 24));

  return (
    <Box marginTop="128px">
      <Box height="4px" width="100%" backgroundColor="black" borderRadius="2px" />
      <Flex marginTop="32px" direction="column">
        <Flex direction={isMobile ? 'column' : 'row'}>
          <Text
            flex={isMobile ? '1' : '0.7'}
            as="p"
            fontSize="32px"
            textAlign={isMobile ? 'center' : 'start'}
          >
            Trouvez votre candidat, simplement, en répondant à{' '}
            <Text as="span" fontWeight="600">
              notre questionnaire
            </Text>{' '}
            ✌️
          </Text>
          <VStack
            marginTop={isMobile ? '16px' : 0}
            flex={isMobile ? '1' : '0.3'}
            alignItems={isMobile ? 'center' : 'flex-end'}
          >
            <MenuLinks
              withSurveyLink
              surveyPath={surveyPath}
              withLegalMentions
              stackSocialNetwork
            />
          </VStack>
        </Flex>
        <Flex margin="32px 0" direction={isMobile ? 'column' : 'row'}>
          <Text
            as="p"
            textAlign={isMobile ? 'center' : 'start'}
            fontSize="16px"
            flex={isMobile ? '1' : '0.5'}
            opacity="0.8"
          >
            <Text as="span" fontWeight="600">
              J-{differenceInDay}
            </Text>{' '}
            avant le premier tour des éléctions.
          </Text>
          <Text
            as="p"
            textAlign={isMobile ? 'center' : 'end'}
            fontSize="16px"
            flex={isMobile ? '1' : '0.5'}
            opacity="0.8"
            marginTop={isMobile ? '16px' : 0}
          >
            Fait avec ♡ à Paris et Nantes. ©2022
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HomeFooter;
