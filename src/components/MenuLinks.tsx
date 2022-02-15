import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';
import SocialNetworks from './SocialNetworks';

export function MenuLinks() {
  return (
    <>
      <NextLink href="/contributeurs" passHref>
        <Button as="a" colorScheme="primary" variant="ghost" aria-label="Contributeurs">
          Contributeurs
        </Button>
      </NextLink>

      <SocialNetworks />
    </>
  );
}
