import { Box, Text, Link, useColorModeValue } from '@chakra-ui/react';

interface DetailedResultsSourceProps {
  questionSource: string;
}

export function DetailedResultsSource(props: DetailedResultsSourceProps) {
  const { questionSource } = props;

  const bgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box
      p={3}
      my={3}
      bgColor={bgColor}
      borderLeftWidth={4}
      borderLeftColor="primary.500"
      borderRadius={4}
    >
      <Text>
        Comment ont été définis ces scores ? Voici{' '}
        <Link isExternal textDecoration="underline" href={questionSource}>
          nos sources
        </Link>
      </Text>
    </Box>
  );
}
