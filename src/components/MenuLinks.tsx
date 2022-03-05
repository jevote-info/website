import NextLink from 'next/link';
import { Button, HStack } from '@chakra-ui/react';
import SocialNetworks from './SocialNetworks';
import { ColorModeSwitch } from './ColorModeSwitch';

type MenuLinksProps = {
  withSurveyLink?: boolean;
  surveyPath?: string;
  withSocialNetworksNames?: boolean;
  withLegalMentions?: boolean;
  withColorModeSwitch?: boolean;
  stackSocialNetwork?: boolean;
};

export function MenuLinks({
  withSurveyLink = false,
  surveyPath,
  withSocialNetworksNames = false,
  withLegalMentions = false,
  withColorModeSwitch = false,
  stackSocialNetwork = false,
}: MenuLinksProps) {
  return (
    <>
      {withSurveyLink && surveyPath && (
        <NextLink href={surveyPath} passHref>
          <Button as="a" colorScheme="primary" variant="ghost" aria-label="Lancer le questionnaire">
            Questionnaire
          </Button>
        </NextLink>
      )}

      <NextLink href="/contributeurs" passHref>
        <Button as="a" colorScheme="primary" variant="ghost" aria-label="Contributeurs">
          Contributeurs
        </Button>
      </NextLink>

      {withLegalMentions && (
        <NextLink href="/cgu" passHref>
          <Button as="a" colorScheme="primary" variant="ghost" aria-label="Mentions légales">
            Mentions légales
          </Button>
        </NextLink>
      )}

      {stackSocialNetwork ? (
        <HStack>
          <SocialNetworks withNames={withSocialNetworksNames} />
        </HStack>
      ) : (
        <SocialNetworks withNames={withSocialNetworksNames} />
      )}

      {withColorModeSwitch && <ColorModeSwitch />}
    </>
  );
}
