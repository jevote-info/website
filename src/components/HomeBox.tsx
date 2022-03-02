import React from 'react';
import { Box, Heading, Flex, Text, Image, useColorModeValue, useToken } from '@chakra-ui/react';
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
  const [gray800, gray700] = useToken('colors', ['gray.800', 'gray.700']);
  const [bgGradiantStart, bgGradientEnd] = useColorModeValue(
    ['#F1F4F6', '#EFF2F5'],
    [gray800, gray700],
  );
  const borderColor = useColorModeValue('#e8e9ec', gray700);

  return (
    <Box
      borderWidth={4}
      borderStyle="solid"
      borderColor={borderColor}
      borderRadius="32px"
      background={`linear-gradient(180deg, ${bgGradiantStart} 0%, ${bgGradientEnd} 100%);`}
      padding={isMobile ? '32px' : '64px'}
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
        <Heading as="h3" fontWeight="600" fontSize={isMobile ? '36px' : '28px'}>
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
