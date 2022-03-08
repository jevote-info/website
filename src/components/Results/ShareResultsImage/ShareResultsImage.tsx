import { Box, Container, VStack, Text, Flex, Image } from '@chakra-ui/react';
import { Politician } from '@prisma/client';
import { SharingVariant } from '../../../types/surveyResult';
import { Logo } from '../../Logo';
import { Podium } from '../Podium';

interface ShareResultsImageProps {
  sharingVariant?: SharingVariant;
  topThreePoliticians: Politician[];
}
export function ShareResultsImage(props: ShareResultsImageProps) {
  const { topThreePoliticians, sharingVariant } = props;

  if (sharingVariant === 'story') {
    return (
      <Container
        style={{ background: 'linear-gradient(117.48deg, #4C4FB6 15.73%, #F59F81 98.58%)' }}
        width="1080px"
        height="1920px"
        padding="156px 60px"
        minWidth="1080px"
        minHeight="1920px"
      >
        <VStack
          justifyContent="space-between"
          alignItems="center"
          bgColor="white"
          width="960px"
          minWidth="960px"
          height="1608px"
          borderRadius="32px"
          paddingTop="64px"
          paddingBottom="94px"
        >
          <Logo vertical sizeVariant="story" />
          <Box minHeight="800px" width="full" padding="0 96px 96px" flex="0.85">
            <Text textAlign="center" fontSize="32px">
              Mes résultats :
            </Text>
            <Podium politicians={topThreePoliticians} variant="story" withPictures={false} />
          </Box>
          <Flex
            bgColor="primary.600"
            color="white"
            width="772px"
            height="132px"
            borderRadius="32px"
            fontSize="44px"
            justifyContent="center"
            alignItems="center"
          >
            <Image src="/point-right-emoji.png" width="64px" height="64px" />
            <Text ml="5">
              Je trouve <strong>mon candidat</strong>
            </Text>
          </Flex>
        </VStack>
      </Container>
    );
  } else if (sharingVariant === 'post') {
    return (
      <Container
        style={{ background: 'linear-gradient(117.48deg, #4C4FB6 15.73%, #F59F81 98.58%)' }}
        width="1000px"
        height="1000px"
        padding="60px"
        minWidth="1000px"
        minHeight="1000px"
      >
        <VStack
          justifyContent="space-between"
          alignItems="center"
          bgColor="white"
          width="880px"
          minWidth="880px"
          height="880px"
          borderRadius="32px"
          paddingTop="40px"
          position="relative"
        >
          <Box position="absolute" top="45px" right="42px">
            <Logo vertical sizeVariant="post" />
          </Box>
          <Box minHeight="800px" width="full" padding="0 96px 96px" flex="0.85">
            <Text textAlign="center" fontSize="32px" mb="35px">
              Mes résultats :
            </Text>
            <Podium politicians={topThreePoliticians} variant="post" withPictures={false} />
          </Box>
          <Flex
            bgColor="primary.600"
            color="white"
            width="772px"
            height="132px"
            borderRadius="32px"
            fontSize="44px"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            bottom="32px"
          >
            <Image src="/point-right-emoji.png" width="64px" height="64px" />
            <Text ml="5">
              Je trouve <strong>mon candidat</strong>
            </Text>
          </Flex>
        </VStack>
      </Container>
    );
  }
  return null;
}
