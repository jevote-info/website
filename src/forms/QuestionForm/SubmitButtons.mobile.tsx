import { Box, Button, HStack, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

interface SubmitButtonsProps {
  isFinal: boolean;
  previousPath: string | null;
}

export function SubmitButtonsMobile(props: SubmitButtonsProps) {
  const { isFinal, previousPath } = props;

  const bgColor = useColorModeValue('white', 'black');

  return (
    <Box height="64px">
      <HStack
        spacing={5}
        p={3}
        justifyContent="space-between"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bgColor={bgColor}
        width="full"
        boxShadow="1px -1px 10px -3px rgb(0 0 0 / 30%)"
      >
        {previousPath && (
          <Link href={previousPath} passHref>
            <Button as="a" variant="outline" colorScheme="primary" flex={1}>
              Précédent
            </Button>
          </Link>
        )}
        <Button type="submit" colorScheme="primary" ml="auto" flex={1}>
          {isFinal ? 'Accéder aux résultats' : 'Suivant'}
        </Button>
      </HStack>
    </Box>
  );
}
