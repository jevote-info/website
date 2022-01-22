import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import Category from '../../types/category';

interface SubmitButtonsProps {
  previousCategory: Category | null;
  nextCategory: Category | null;
}

export function SubmitButtonsDesktop(props: SubmitButtonsProps) {
  const { previousCategory, nextCategory } = props;

  return (
    <HStack mt={5} spacing={5} justifyContent="space-between">
      {previousCategory && (
        <Link href={`/categorie/${previousCategory.slug}`} passHref>
          <Button as="a" variant="outline" colorScheme="primary" size="lg">
            Précédent
          </Button>
        </Link>
      )}
      <Button type="submit" colorScheme="primary" ml="auto" size="lg">
        {nextCategory ? 'Suivant' : 'Accéder aux résultats'}
      </Button>
    </HStack>
  );
}
