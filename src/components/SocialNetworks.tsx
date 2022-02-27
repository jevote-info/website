import React from 'react';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Button, Text } from '@chakra-ui/react';

type SocialNetworksProps = {
  colorScheme?: string;
  withNames?: boolean;
};

const SocialNetworks = ({ colorScheme = 'primary', withNames = false }: SocialNetworksProps) => {
  return (
    <>
      <NextLink href="https://www.instagram.com/jevote.info/" passHref>
        <Button
          as="a"
          colorScheme={colorScheme}
          variant="ghost"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon width={16} icon={faInstagram} />
          {withNames && <Text marginLeft="8px">Instagram</Text>}
        </Button>
      </NextLink>

      <NextLink href="https://www.facebook.com/JeVote.info/" passHref>
        <Button
          as="a"
          colorScheme={colorScheme}
          variant="ghost"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon width={16} icon={faFacebook} />
          {withNames && <Text marginLeft="8px">Facebook</Text>}
        </Button>
      </NextLink>

      <NextLink href="https://twitter.com/jevote_info" passHref>
        <Button
          as="a"
          colorScheme={colorScheme}
          variant="ghost"
          aria-label="Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon width={16} icon={faTwitter} />
          {withNames && <Text marginLeft="8px">Twitter</Text>}
        </Button>
      </NextLink>
      <NextLink href="https://www.linkedin.com/company/jevote.info" passHref>
        <Button
          as="a"
          colorScheme={colorScheme}
          variant="ghost"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon width={16} icon={faLinkedin} />
          {withNames && <Text marginLeft="8px">LinkedIn</Text>}
        </Button>
      </NextLink>
    </>
  );
};

export default SocialNetworks;
