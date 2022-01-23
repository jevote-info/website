import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SubmitButtonsProps {
  isFinal: boolean;
  previousPath: string | null;
}

export function SubmitButtonsDesktop(props: SubmitButtonsProps) {
  const { isFinal, previousPath } = props;

  return (
    <HStack mt={5} spacing={5} justifyContent="space-between">
      {previousPath && (
        <Link href={previousPath} passHref>
          <Button as="a" variant="outline" colorScheme="primary" size="lg">
            Précédent
          </Button>
        </Link>
      )}
      <Button type="submit" colorScheme="primary" ml="auto" size="lg">
        {isFinal ? 'Accéder aux résultats' : 'Suivant'}
      </Button>
    </HStack>
  );
}
