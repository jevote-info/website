import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useCategoryProgress } from '../../../hooks/useCategoryProgress';
import { CategoryAnswers } from '../../../types/answers';
import { LightweightCategory } from '../../../types/category';
import { CategoryIcon } from '../CategoryIcon';

interface CategoryItemProps {
  isActive: boolean;
  category: LightweightCategory;
  categoryAnswers?: CategoryAnswers;
}

export function CategoryItem(props: CategoryItemProps) {
  const { isActive, category, categoryAnswers } = props;
  const activeColor = useColorModeValue('primary.100', 'gray.700');
  const hoverColor = useColorModeValue('primary.50', 'gray.700');

  const { progress, isComplete, nbAnswers } = useCategoryProgress(category, categoryAnswers);

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
        <Box width={10} justifyContent="center" color="white">
          <CategoryIcon category={category} />
        </Box>
        <Text flex={1} fontSize="lg" fontWeight="semibold">
          {category.title}
        </Text>
        {isComplete ? (
          <Box p={1} color="green.400">
            <FontAwesomeIcon
              aria-label="complétée"
              width="30px"
              height="30px"
              icon={faCheckCircle}
            />
          </Box>
        ) : (
          <CircularProgress
            alignSelf="end"
            value={progress}
            size="40px"
            aria-label={`${nbAnswers} questions remplies sur ${category.questions.length}`}
          >
            <CircularProgressLabel>
              {nbAnswers}/{category.questions.length}
            </CircularProgressLabel>
          </CircularProgress>
        )}
      </HStack>
    </Link>
  );
}
