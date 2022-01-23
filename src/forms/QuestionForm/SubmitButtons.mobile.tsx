import { Box, Button, HStack, useColorModeValue, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { Control } from 'react-hook-form';
import ImportanceMeter from '../../components/ImportanceMeter';
import { QuestionAnswer } from '../../types/answers';

interface SubmitButtonsProps {
  isFinal: boolean;
  previousPath: string | null;
  control: Control<QuestionAnswer>;
}

export function SubmitButtonsMobile(props: SubmitButtonsProps) {
  const { isFinal, previousPath, control } = props;

  const bgColor = useColorModeValue('white', 'black');

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      boxShadow="1px -1px 10px -3px rgb(0 0 0 / 30%)"
      spacing={3}
      p={3}
      bgColor={bgColor}
    >
      <VStack>
        <ImportanceMeter control={control} />
        <HStack justifyContent="space-between" width="full">
          {previousPath && (
            <Link href={previousPath} passHref>
              <Button as="a" variant="outline" colorScheme="primary" flex={1}>
                Précédent
              </Button>
            </Link>
          )}
          <Button type="submit" colorScheme="primary" ml="auto" flex={1}>
            {isFinal ? 'Voir les résultats' : 'Suivant'}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
