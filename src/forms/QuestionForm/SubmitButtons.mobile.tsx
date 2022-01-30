import { ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

interface SubmitButtonsProps {
  previousPath: string | null;
  canGoToResult: boolean;
}

export function SubmitButtonsMobile(props: SubmitButtonsProps) {
  const { previousPath, canGoToResult } = props;

  const bgColor = useColorModeValue('white', 'black');

  return (
    <Box height="64px" width="full">
      <HStack
        spacing={3}
        p={3}
        justifyContent="start"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bgColor={bgColor}
        width="full"
      >
        <Box flex={1}>
          {canGoToResult && (
            <Link href="/resultat" passHref>
              <Button as="a" colorScheme="blue">
                Voir les résultats
              </Button>
            </Link>
          )}
        </Box>
        {previousPath && (
          <Link href={previousPath} passHref>
            <Button as="a" variant="outline" colorScheme="primary">
              <ChevronUpIcon />
            </Button>
          </Link>
        )}
        <Button type="submit" colorScheme="primary">
          Suivant
        </Button>
      </HStack>
    </Box>
  );
}
