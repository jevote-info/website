import { useColorModeValue, useToken } from '@chakra-ui/react';
import { LightweightCategory } from '../../../types/category';

interface CategoryIconProps {
  category: LightweightCategory;
}

export function CategoryIcon(props: CategoryIconProps) {
  const { category } = props;

  const [primary50, primary500] = useToken('colors', ['primary.50', 'primary.500']);
  const color = useColorModeValue(primary500, primary50);

  return (
    <svg color={color} width={40} height={32} aria-label={category.title}>
      <use href={`/icons/categories.svg#${category.image}`} />
    </svg>
  );
}
