import { Flex, HStack, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import Category from '../../types/category';

interface CategoryItemProps {
  isActive: boolean;
  category: Category;
}

export function CategoryItem(props: CategoryItemProps) {
  const { isActive, category } = props;

  return (
    <Link href={`/categorie/${category.slug}`} passHref>
      <HStack
        as="a"
        width="full"
        spacing={3}
        bgColor={isActive ? 'primary.100' : undefined}
        borderRadius="lg"
        boxShadow={isActive ? 'md' : undefined}
        p={5}
      >
        <Flex width={10} justifyContent="center">
          <Image src={category.image} alt={category.title} height={8} />
        </Flex>
        <Text fontSize="lg" fontWeight="semibold">
          {category.title}
        </Text>
      </HStack>
    </Link>
  );
}
