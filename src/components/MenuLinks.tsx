import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@chakra-ui/react';

export function MenuLinks() {
  return (
    <>
      <NextLink href="/equipe" passHref>
        <Button as="a" colorScheme="primary" variant="ghost" aria-label="L'équipe">
          L&apos;équipe
        </Button>
      </NextLink>

      <NextLink href="https://www.instagram.com/" passHref>
        <Button as="a" colorScheme="primary" variant="ghost" aria-label="Instagram" target="_blank">
          <FontAwesomeIcon width={16} icon={faInstagram} />
        </Button>
      </NextLink>

      <NextLink href="https://www.facebook.com/" passHref>
        <Button as="a" colorScheme="primary" variant="ghost" aria-label="Facebook" target="_blank">
          <FontAwesomeIcon width={16} icon={faFacebook} />
        </Button>
      </NextLink>

      <NextLink href="https://twitter.com/" passHref>
        <Button as="a" colorScheme="primary" variant="ghost" aria-label="Twitter" target="_blank">
          <FontAwesomeIcon width={16} icon={faTwitter} />
        </Button>
      </NextLink>
    </>
  );
}
