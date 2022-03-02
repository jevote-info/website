import { Box, DarkMode, Flex, Heading, Text, useClipboard } from '@chakra-ui/react';
import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import SocialNetworks from './SocialNetworks';

const SocialShare = () => {
  const { hasCopied, onCopy } = useClipboard('https://jevote.info');
  const isMobile = useIsMobile();

  return (
    <Box
      width="100%"
      padding={isMobile ? '32px' : '64px'}
      marginTop="64px"
      background="linear-gradient(117.48deg, #4C4FB6 15.73%, #F59F81 98.58%)"
      boxSizing="border-box"
      boxShadow="0px 0px 64px 2px rgba(0, 0, 0, 0.04)"
      borderRadius="32px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading as="h3" color="white" textAlign="center">
        Partagez avec vos amis
      </Heading>
      <Flex
        width="100%"
        height="64px"
        marginTop="32px"
        borderRadius="32px"
        backgroundColor="white"
        alignItems="center"
        border="2px solid rgba(76, 79, 182, 0.08)"
        justifyContent="center"
      >
        <Text marginLeft={isMobile ? '16px' : '32px'} flex="1" color="black">
          https://jevote.info
        </Text>
        <Box
          marginRight="-2px"
          height="64px"
          as="button"
          fontSize="20px"
          textAlign="center"
          borderRadius="32px"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          fontWeight="bold"
          padding={isMobile ? '0 16px' : '0 64px'}
          backgroundColor={hasCopied ? 'secondary.500' : 'primary.600'}
          color="white"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ background: hasCopied ? 'secondary.500' : 'primary.500' }}
          _active={{
            background: hasCopied ? 'secondary.500' : 'primary.400',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          onClick={onCopy}
        >
          {hasCopied ? 'Copié' : 'Copier'}
        </Box>
      </Flex>
      <Text color="white" textAlign="center" marginTop="32px">
        Vous avez aimé le questionnaire et notre démarche ?<br />
        Partagez-le à vos proches en leur envoyant le lien ci-dessus et aidez-nous à le faire
        connaître au plus grand nombre.
        <br />
        <br />
        <br />
        Vous pouvez également nous retrouver sur tous nos réseaux sociaux pour être tenu au courant
        des dernières nouveautés.
      </Text>
      <Flex marginTop="32px">
        <DarkMode>
          <SocialNetworks colorScheme="gray" />
        </DarkMode>
      </Flex>
    </Box>
  );
};

export default SocialShare;
