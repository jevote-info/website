import { Box, Button, HStack, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import Category from '../../types/category';

interface SubmitButtonsProps {
  previousCategory: Category | null;
  nextCategory: Category | null;
}

export function SubmitButtonsMobile(props: SubmitButtonsProps) {
  const { previousCategory, nextCategory } = props;

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
      >
        {previousCategory && (
          <Link href={`/categorie/${previousCategory.slug}`} passHref>
            <Button as="a" variant="outline" colorScheme="primary" flex={1}>
              Précédent
            </Button>
          </Link>
        )}
        <Button type="submit" colorScheme="primary" ml="auto" flex={1}>
          {nextCategory ? 'Suivant' : 'Accéder aux résultats'}
        </Button>
      </HStack>
    </Box>
  );
}
