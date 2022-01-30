import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';

interface SubmitButtonsProps {
  previousPath: string | null;
  canGoToResult: boolean;
}

export function SubmitButtonsDesktop(props: SubmitButtonsProps) {
  const { canGoToResult, previousPath } = props;

  return (
    <HStack mt={5} spacing={5} justifyContent="space-between">
      {previousPath && (
        <Link href={previousPath} passHref>
          <Button as="a" variant="outline" colorScheme="primary" size="lg">
            Précédent
          </Button>
        </Link>
      )}
      {canGoToResult && (
        <Link href="/resultats" passHref>
          <Button as="a" colorScheme="primary" size="lg">
            Voir les résultats
          </Button>
        </Link>
      )}
      <Button type="submit" colorScheme="primary" ml="auto" size="lg">
        Suivant
      </Button>
    </HStack>
  );
}
