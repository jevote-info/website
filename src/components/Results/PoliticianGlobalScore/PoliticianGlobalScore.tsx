import { Avatar, Box, Button, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { Politician } from '@prisma/client';

interface PoliticianGlobalScoreProps {
  politician: Politician;
  score: number;
  onClick(): void;
}

export function PoliticianGlobalScore(props: PoliticianGlobalScoreProps) {
  const { politician, score, onClick } = props;

  const defaultProgressBackground = useColorModeValue('teal.50', 'gray.500');
  const valueNow = Math.abs(score);

  return (
    <Button
      isFullWidth
      height="fit-content"
      display="block"
      variant="ghost"
      p={5}
      onClick={onClick}
    >
      <HStack justify="space-between">
        <HStack padding={2} alignItems="center" mb={3} spacing={3}>
          <Avatar name={politician.name} src={politician.pictureUrl} />
          <Text marginLeft={2} fontWeight="bold">
            {politician.name}
          </Text>
        </HStack>
        <Text color={score > 0 ? 'primary.400' : 'secondary.400'} fontWeight="bold" fontSize="lg">
          {score}
        </Text>
      </HStack>

      <Box
        flex={1}
        height={8}
        bgColor={defaultProgressBackground}
        borderRadius="lg"
        position="relative"
        mb={5}
        role="progressbar"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={valueNow}
      >
        <Box
          height={8}
          width={`${valueNow / 2}%`}
          position="absolute"
          top={0}
          bottom={0}
          left="50%"
          bgColor={score > 0 ? 'primary.500' : 'secondary.500'}
          transform={score < 0 ? 'rotate(180deg)' : undefined}
          transformOrigin="left"
          borderRightRadius="lg"
          transition="width 200ms ease"
        />
      </Box>
    </Button>
  );
}
