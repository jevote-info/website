import { useColorMode } from '@chakra-ui/react';
import { LightweightCategory } from '../../../types/category';

interface CategoryIconProps {
  category: LightweightCategory;
}

export function CategoryIcon(props: CategoryIconProps) {
  const { category } = props;
  const { colorMode } = useColorMode();

  return (
    <svg width={40} height={32} aria-label={category.title}>
      <use href={`/icons/categories.svg#${category.image}-${colorMode}`} />
    </svg>
  );
}
