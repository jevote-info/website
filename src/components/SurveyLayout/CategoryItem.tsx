import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useMemo } from 'react';
import { CategoryAnswers } from '../../types/answers';
import Category from '../../types/category';

interface CategoryItemProps {
  isActive: boolean;
  category: Category;
  categoryAnswers?: CategoryAnswers;
}

export function CategoryItem(props: CategoryItemProps) {
  const { isActive, category, categoryAnswers } = props;
  const activeColor = useColorModeValue('primary.100', 'gray.700');
  const hoverColor = useColorModeValue('primary.50', 'gray.700');

  const nbAnswers = useMemo(() => {
    return category.questions.reduce(
      (acc, question) => (categoryAnswers?.[question.id]?.choiceId ? acc + 1 : acc),
      0,
    );
  }, [category, categoryAnswers]);
  const progress = (nbAnswers * 100) / category.questions.length;
  const isComplete = progress === 100;

  return (
    <Link href={`/categories/${category.slug}/questions/${category.questions[0]?.order}`} passHref>
      <HStack
        as="a"
        width="full"
        spacing={3}
        bgColor={isActive ? activeColor : undefined}
        borderRadius="lg"
        boxShadow={isActive ? 'md' : undefined}
        p={5}
        _hover={{
          bgColor: isActive ? activeColor : hoverColor,
        }}
      >
        <Box width={10} justifyContent="center">
          <Image src={category.image} alt={category.title} height={8} />
        </Box>
        <Text flex={1} fontSize="lg" fontWeight="semibold">
          {category.title}
        </Text>
        {isComplete ? (
          <Box p={1} color="green.400">
            <FontAwesomeIcon width="30px" height="30px" icon={faCheckCircle} />
          </Box>
        ) : (
          <CircularProgress alignSelf="end" value={progress} size="40px">
            <CircularProgressLabel>
              {nbAnswers}/{category.questions.length}
            </CircularProgressLabel>
          </CircularProgress>
        )}
      </HStack>
    </Link>
  );
}
