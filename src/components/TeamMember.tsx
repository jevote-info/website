import { Box, Button, GridItem, Heading, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import NextLink from 'next/link';
import React from 'react';
import Image from 'next/image';

type TeamMemberProps = {
  imagePath?: string;
  name: string;
  title?: string;
  description: string;
  linkedInUrl?: string;
  twitterUrl?: string;
};

const TeamMember = ({
  imagePath,
  name,
  title,
  description,
  linkedInUrl,
  twitterUrl,
}: TeamMemberProps) => {
  return (
    <GridItem w="100%" marginBottom="32px" maxWidth="800px">
      <Box>
        {imagePath && (
          <Image
            src={imagePath}
            alt={`Photo de ${name}`}
            width={400}
            height={600}
            objectFit="cover"
          />
        )}
        <Heading as="h2" size="md" mt={5} marginBottom="4px">
          {name}
        </Heading>
        {title && (
          <Heading as="h3" size="sm" marginBottom="16px">
            {title}
          </Heading>
        )}
        <Text marginBottom="16px">{description}</Text>
        {linkedInUrl && (
          <NextLink href={linkedInUrl} passHref>
            <Button
              as="a"
              target="_blank"
              aria-label={`Lien vers le profil LinkedIn de ${name}`}
              rel="noopener noreferrer"
              colorScheme="linkedin"
              leftIcon={<FontAwesomeIcon icon={faLinkedin} />}
            >
              LinkedIn
            </Button>
          </NextLink>
        )}
        {twitterUrl && (
          <NextLink href={twitterUrl} passHref>
            <Button
              as="a"
              target="_blank"
              aria-label={`Lien vers le profil Twitter de ${name}`}
              rel="noopener noreferrer"
              colorScheme="twitter"
              leftIcon={<FontAwesomeIcon icon={faTwitter} />}
              marginLeft={linkedInUrl && '3'}
            >
              Twitter
            </Button>
          </NextLink>
        )}
      </Box>
    </GridItem>
  );
};

export default TeamMember;
