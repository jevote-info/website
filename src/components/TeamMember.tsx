import { Box, Button, GridItem, Heading, Text, Icon } from '@chakra-ui/react';
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
  dribbbleUrl?: string;
};

const TeamMember = ({
  imagePath,
  name,
  title,
  description,
  linkedInUrl,
  twitterUrl,
  dribbbleUrl,
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
        {dribbbleUrl && (
          <NextLink href={dribbbleUrl} passHref>
            <Button
              as="a"
              target="_blank"
              aria-label={`Lien vers le profil Dribbble de ${name}`}
              rel="noopener noreferrer"
              colorScheme="dribbble"
              leftIcon={
                <Icon width="16px" height="16px" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="#000" fillOpacity="0" />
                  <circle cx="50" cy="50" r="48" fill="#ea4c89" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M50 0C22.397 0 0 22.397 0 50C0 77.603 22.397 100 50 100C77.5488 100 100 77.603 100 50C100 22.397 77.5488 0 50 0ZM83.026 23.0477C88.9913 30.3145 92.5705 39.5879 92.679 49.6204C91.269 49.3492 77.1692 46.4751 62.961 48.2646C62.6356 47.5597 62.3644 46.8004 62.0391 46.0412C61.1714 43.9805 60.1952 41.8655 59.2191 39.859C74.9458 33.4599 82.1041 24.2408 83.026 23.0477ZM50 7.37527C60.846 7.37527 70.7701 11.4425 78.308 18.1128C77.5488 19.1974 71.0954 27.82 55.9111 33.5141C48.9154 20.6616 41.1605 10.141 39.9675 8.5141C43.167 7.75488 46.5293 7.37527 50 7.37527ZM31.833 11.3883C32.9718 12.9067 40.564 23.4816 47.6681 36.0629C27.7115 41.3774 10.0868 41.269 8.18872 41.269C10.9544 28.0369 19.9024 17.0282 31.833 11.3883ZM7.26681 50.0542C7.26681 49.6204 7.26681 49.1866 7.26681 48.7527C9.11063 48.8069 29.8265 49.0781 51.1388 42.679C52.3861 45.0651 53.5249 47.5054 54.6095 49.9458C54.0672 50.1085 53.4707 50.2712 52.9284 50.4338C30.9111 57.538 19.1974 76.9523 18.2213 78.5792C11.4425 71.0412 7.26681 61.0087 7.26681 50.0542ZM50 92.7332C40.1302 92.7332 31.0195 89.3709 23.8069 83.731C24.5662 82.1584 33.243 65.4555 57.321 57.0499C57.4295 56.9957 57.4837 56.9957 57.5922 56.9414C63.6117 72.5054 66.0521 85.5748 66.7028 89.3167C61.551 91.5401 55.9111 92.7332 50 92.7332ZM73.807 85.4122C73.3731 82.8091 71.0955 70.3362 65.5098 54.9892C78.9046 52.8742 90.6182 56.3449 92.0824 56.833C90.2386 68.7093 83.4056 78.9588 73.807 85.4122Z"
                    fill="currentcolor"
                  />
                </Icon>
              }
              marginLeft={(twitterUrl || linkedInUrl) && '3'}
            >
              Dribbble
            </Button>
          </NextLink>
        )}
      </Box>
    </GridItem>
  );
};

export default TeamMember;
