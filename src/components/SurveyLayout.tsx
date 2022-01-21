import { Flex, Text, Image, Box, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';
import NextLink from 'next/link';
import Survey from '../types/survey';

interface SurveyLayoutProps {
  survey: Survey;
  currentCategory: Survey[number];
}

const SurveyLayout: FC<SurveyLayoutProps> = ({ children, survey, currentCategory }) => {
  const color = useColorModeValue('primary.600', 'primary.200');
  const hoverColor = useColorModeValue('primary.50', 'rgba(167, 172, 224, 0.12)');
  const activeColor = useColorModeValue('primary.100', 'rgba(167, 172, 224, 0.24)');

  return (
    <Flex direction="column">
      <Flex direction="row" padding="16px 0" alignItems="stretch" overflow="scroll">
        {survey.map(category => (
          <Box
            key={category.id}
            aria-label={category.title}
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="8px"
            borderRadius="lg"
            as="a"
            color={category.id === currentCategory.id ? 'secondary.400' : color}
            fontWeight={'semibold'}
            cursor="pointer"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            _hover={{ bg: hoverColor }}
            _active={{
              bg: activeColor,
              transform: 'scale(0.98)',
            }}
            _focus={{
              boxShadow: 'outline',
            }}
          >
            <NextLink href={`/categorie/${category.slug}`} passHref>
              <Flex direction="column" align="center">
                <Image src={category.image} alt={category.title} height="32px" marginBottom="4px" />
                <Text align="center" noOfLines={2}>
                  {category.title}
                </Text>
              </Flex>
            </NextLink>
          </Box>
        ))}
      </Flex>
      {children}
    </Flex>
  );
};

export default SurveyLayout;
