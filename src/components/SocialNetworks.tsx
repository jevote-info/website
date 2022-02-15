import React from 'react';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@chakra-ui/react';

type SocialNetworksProps = {
  colorScheme?: string;
};

const SocialNetworks = ({ colorScheme = 'primary' }: SocialNetworksProps) => {
  return (
    <>
      <NextLink href="https://www.instagram.com/" passHref>
        <Button
          as="a"
          colorScheme={colorScheme}
          variant="ghost"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon width={16} icon={faInstagram} />
        </Button>
      </NextLink>

      <NextLink href="https://www.facebook.com/" passHref>
        <Button
          as="a"
          colorScheme={colorScheme}
          variant="ghost"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon width={16} icon={faFacebook} />
        </Button>
      </NextLink>

      <NextLink href="https://twitter.com/" passHref>
        <Button
          as="a"
          colorScheme={colorScheme}
          variant="ghost"
          aria-label="Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon width={16} icon={faTwitter} />
        </Button>
      </NextLink>
      <NextLink href="https://linkedin.com/" passHref>
        <Button
          as="a"
          colorScheme={colorScheme}
          variant="ghost"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon width={16} icon={faLinkedin} />
        </Button>
      </NextLink>
    </>
  );
};

export default SocialNetworks;
