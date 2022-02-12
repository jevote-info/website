import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';

interface SubmitButtonsProps {
  formId: string;
  previousPath: string | null;
}

export function SubmitButtonsDesktop(props: SubmitButtonsProps) {
  const { formId, previousPath } = props;

  return (
    <HStack mt={5} spacing={5} justifyContent="space-between" width="full">
      {previousPath && (
        <Link href={previousPath} passHref>
          <Button as="a" variant="outline" colorScheme="primary" size="lg">
            Précédent
          </Button>
        </Link>
      )}
      <Button form={formId} type="submit" colorScheme="primary" ml="auto" size="lg">
        Suivant
      </Button>
    </HStack>
  );
}
