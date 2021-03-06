import { ChevronUpIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

interface SubmitButtonsProps {
  formId: string;
  previousPath: string | null;
  canGoToResult: boolean;
}

export function SubmitButtonsMobile(props: SubmitButtonsProps) {
  const { formId, previousPath, canGoToResult } = props;

  const bgColor = useColorModeValue('#FFFFFF', '#1a202c');

  return (
    <HStack
      background={`linear-gradient(0deg,${bgColor} 80%, ${bgColor}00 100%)`}
      spacing={3}
      px={5}
      py={3}
      pt={6}
      justifyContent="start"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      width="full"
    >
      <Link href={previousPath || '/'} passHref>
        <Button as="a" variant="outline" colorScheme="primary">
          <ChevronUpIcon />
        </Button>
      </Link>
      <Button form={formId} type="submit" colorScheme="primary">
        Suivant
      </Button>
      <Flex flex={1} justify="flex-end">
        {canGoToResult && (
          <Link href="/resultats" passHref>
            <Button as="a" colorScheme="blue">
              Voir les résultats
            </Button>
          </Link>
        )}
      </Flex>
    </HStack>
  );
}
