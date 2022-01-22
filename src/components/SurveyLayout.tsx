import { Flex, Text, Image, Box, useColorModeValue, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import Survey from '../types/survey';
import Link from 'next/link';

interface SurveyLayoutProps {
  survey: Survey;
  currentCategory: Survey[number];
}

const SurveyLayout: FC<SurveyLayoutProps> = ({ children, survey, currentCategory }) => {
  const color = useColorModeValue('primary.900', 'primary.200');
  const activeColor = useColorModeValue('secondary.900', 'secondary.20');

  return (
    <Flex direction="column">
      <SimpleGrid minChildWidth={150} p={5} gap={3}>
        {survey.map(category => (
          <Link href={`/categorie/${category.slug}`} passHref>
            <Box
              key={category.id}
              as="a"
              aria-label={category.title}
              color={currentCategory.id === category.id ? activeColor : color}
              fontWeight={currentCategory.id === category.id ? 'bold' : 'semibold'}
              cursor="pointer"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _hover={{ transform: 'scale(0.95)' }}
            >
              <Flex direction="column" align="center">
                <Image src={category.image} alt={category.title} height="32px" marginBottom="4px" />
                <Text align="center" noOfLines={3}>
                  {category.title}
                </Text>
              </Flex>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
      {children}
    </Flex>
  );
};

export default SurveyLayout;
