import React from 'react';
import { Box, Heading, Flex, Text, Image } from '@chakra-ui/react';
import { useIsMobile } from '../hooks/useIsMobile';

type HomeBoxProps = {
  title: string;
  description: string;
  imagePath: string;
  isImageFirst?: boolean;
  isSmall?: boolean;
};

const HomeBox = ({
  title,
  description,
  imagePath,
  isSmall = false,
  isImageFirst = false,
}: HomeBoxProps) => {
  const isMobile = useIsMobile();

  return (
    <Box
      borderWidth={4}
      borderStyle="solid"
      borderColor="#e8e9ec"
      borderRadius="32px"
      background={`linear-gradient(180deg, #F1F4F6 0%, #EFF2F5 100%);`}
      padding={isMobile ? '16px' : '64px'}
      display="flex"
      flexDirection={isSmall ? 'column' : 'row'}
      margin="16px"
      flex="1"
    >
      {isImageFirst && (
        <Flex flex={isSmall ? '1' : '0.5'} alignItems="center" justifyContent="center">
          <Image alt={title} src={imagePath} />
        </Flex>
      )}
      <Box flex={isSmall ? '1' : '0.5'}>
        <Heading as="h3" fontWeight="600">
          {title}
        </Heading>
        <Text marginTop="32px" fontSize="20px">
          {description}
        </Text>
      </Box>
      {!isImageFirst && (
        <Flex flex={isSmall ? '1' : '0.5'} alignItems="center" justifyContent="center">
          <Image alt={title} src={imagePath} />
        </Flex>
      )}
    </Box>
  );
};

export default HomeBox;
